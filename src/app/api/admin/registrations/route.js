import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const items = await query(
      `SELECT id, full_name, phone, attendance, guests_count, note, created_at
       FROM registrations
       ORDER BY created_at DESC`
    );
    const stats = await query(
      `SELECT attendance, COUNT(*) AS count, COALESCE(SUM(
         CAST(SUBSTRING_INDEX(guests_count, '+', 1) AS UNSIGNED)
       ), 0) AS guest_sum
       FROM registrations
       GROUP BY attendance`
    );
    const breakdown = { yes: 0, maybe: 0, no: 0 };
    let totalGuests = 0;
    for (const row of stats) {
      breakdown[row.attendance] = Number(row.count);
      if (row.attendance === 'yes' || row.attendance === 'maybe') {
        totalGuests += Number(row.count) + Number(row.guest_sum);
      }
    }
    return Response.json({
      ok: true,
      total: items.length,
      breakdown,
      totalGuests,
      items,
    });
  } catch (e) {
    console.error('[admin registrations] error:', e.message);
    return Response.json({ ok: false, error: 'Không lấy được danh sách.' }, { status: 500 });
  }
}
