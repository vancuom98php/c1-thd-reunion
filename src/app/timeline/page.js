import { query } from '@/lib/db';
import TimelineClient from '@/components/TimelineClient';

export const revalidate = 300;

const YEARS = ['2013', '2014', '2015', '2016'];

export default async function PageTimeline() {
  let photosByYear = {};

  try {
    const rows = await query(
      `SELECT s3_url, label, year
       FROM timeline_photos WHERE year IN (?, ?, ?, ?)
       ORDER BY display_order, id`,
      YEARS
    );

    for (const row of rows) {
      const year = String(row.year);
      if (!photosByYear[year]) photosByYear[year] = [];
      photosByYear[year].push({
        src: row.s3_url,
        alt: row.label || `Ảnh ${year}`,
      });
    }
  } catch (e) {
    console.error('[timeline] DB error:', e.message);
  }

  return <TimelineClient photosByYear={photosByYear} />;
}
