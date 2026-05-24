import { z } from 'zod';
import { query } from '@/lib/db';
import { signSession, setSessionCookie, verifyPassword } from '@/lib/auth';

const Body = z.object({
  username: z.string().trim().min(1).max(50),
  password: z.string().min(1).max(200),
});

// Constant-time-ish delay on failure to deter casual brute force.
async function tarpit() {
  await new Promise(r => setTimeout(r, 250 + Math.floor(Math.random() * 250)));
}

export async function POST(request) {
  let raw;
  try { raw = await request.json(); }
  catch { return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ ok: false, error: 'Thiếu username hoặc password' }, { status: 400 });
  }

  try {
    const rows = await query(
      'SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1',
      [parsed.data.username]
    );
    const admin = rows[0];
    if (!admin) {
      await tarpit();
      return Response.json({ ok: false, error: 'Sai username hoặc password' }, { status: 401 });
    }
    const ok = await verifyPassword(parsed.data.password, admin.password_hash);
    if (!ok) {
      await tarpit();
      return Response.json({ ok: false, error: 'Sai username hoặc password' }, { status: 401 });
    }

    const token = await signSession({ sub: String(admin.id), u: admin.username });
    await setSessionCookie(token);
    return Response.json({ ok: true });
  } catch (e) {
    console.error('[admin login] error:', e.message);
    return Response.json({ ok: false, error: 'Hệ thống đang gặp sự cố.' }, { status: 500 });
  }
}
