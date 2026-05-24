import { z } from 'zod';
import { query } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';

const PostBody = z.object({
  author_name: z.string().trim().min(1, 'Tên là bắt buộc').max(100),
  message: z.string().trim().min(1, 'Lời nhắn không được để trống').max(2000),
});

function getClientIp(request) {
  // Trust the first hop in X-Forwarded-For when behind a proxy, otherwise
  // fall back to the request URL's remote address (not always available
  // through fetch — best-effort only).
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function GET(request) {
  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '20', 10) || 20, 1), 100);
  const offset = Math.max(parseInt(url.searchParams.get('offset') || '0', 10) || 0, 0);

  try {
    const items = await query(
      `SELECT id, author_name, message, created_at
       FROM guestbook
       WHERE is_approved = 1
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const [{ total }] = await query('SELECT COUNT(*) AS total FROM guestbook WHERE is_approved = 1');
    return Response.json(
      { items, total },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (e) {
    console.error('[guestbook GET] DB error:', e.message);
    return Response.json({ items: [], total: 0 }, { status: 200 });
  }
}

export async function POST(request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return Response.json(
      { ok: false, error: `Quá nhanh — vui lòng thử lại sau ${rl.retryAfter}s.` },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } }
    );
  }

  let raw;
  try { raw = await request.json(); }
  catch { return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = PostBody.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues?.[0]?.message || 'Dữ liệu không hợp lệ';
    return Response.json({ ok: false, error: first }, { status: 400 });
  }

  try {
    const result = await query(
      'INSERT INTO guestbook (author_name, message) VALUES (?, ?)',
      [parsed.data.author_name, parsed.data.message]
    );
    return Response.json({ ok: true, id: result.insertId }, { status: 201 });
  } catch (e) {
    console.error('[guestbook POST] DB error:', e.message);
    return Response.json({ ok: false, error: 'Không gửi được lời nhắn.' }, { status: 500 });
  }
}
