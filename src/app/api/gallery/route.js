import { query } from '@/lib/db';

export async function GET(request) {
  const url = new URL(request.url);
  const year = url.searchParams.get('year');
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '60', 10) || 60, 1), 200);

  try {
    let rows;
    if (year && year !== 'all') {
      rows = await query(
        `SELECT id, s3_url, s3_url_thumbnail, year, label, display_order, width, height, blur_data_url
         FROM gallery_photos WHERE year = ? ORDER BY display_order, id LIMIT ?`,
        [year, limit]
      );
    } else {
      rows = await query(
        `SELECT id, s3_url, s3_url_thumbnail, year, label, display_order, width, height, blur_data_url
         FROM gallery_photos ORDER BY display_order, id LIMIT ?`,
        [limit]
      );
    }
    return Response.json(
      { items: rows },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400' } }
    );
  } catch (e) {
    console.error('[gallery API] DB error:', e.message);
    return Response.json({ items: [] }, { status: 200 });
  }
}
