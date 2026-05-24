import { z } from 'zod';
import { query } from '@/lib/db';

const Body = z.object({
  full_name: z.string().trim().min(1, 'Họ tên là bắt buộc').max(100),
  phone: z.string().trim().min(1, 'SĐT là bắt buộc').max(20),
  attendance: z.enum(['yes', 'maybe', 'no']).default('yes'),
  guests_count: z.string().trim().min(1).max(5).default('0'),
  note: z.string().trim().max(2000).nullish().or(z.literal('').transform(() => null)),
});

export async function POST(request) {
  let raw;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues?.[0]?.message || 'Dữ liệu không hợp lệ';
    return Response.json({ ok: false, error: first }, { status: 400 });
  }

  const r = parsed.data;
  try {
    const result = await query(
      `INSERT INTO registrations (full_name, phone, attendance, guests_count, note)
       VALUES (?, ?, ?, ?, ?)`,
      [r.full_name, r.phone, r.attendance, r.guests_count, r.note ?? null]
    );
    return Response.json({ ok: true, id: result.insertId }, { status: 201 });
  } catch (e) {
    console.error('[register] DB error:', e.message);
    return Response.json({ ok: false, error: 'Không lưu được đăng ký, vui lòng thử lại.' }, { status: 500 });
  }
}
