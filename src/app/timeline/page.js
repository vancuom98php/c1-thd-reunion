import { query } from '@/lib/db';
import TimelineClient from '@/components/TimelineClient';

export const revalidate = 300;

// Maps a single calendar year (as stored in timeline_photos.year) to the
// milestone bucket key used by TL_ITEMS in TimelineClient.jsx. The range keys
// below MUST match those `year` values exactly — note the en-dash (–, U+2013),
// not a hyphen (-). Years 2013–2016 and 2026 map 1:1; 2017+ group into ranges.
function milestoneKeyFor(year) {
  const y = Number(year);
  if (y >= 2013 && y <= 2016) return String(y);
  if (y >= 2017 && y <= 2020) return '2017–2020';
  if (y >= 2021 && y <= 2023) return '2021–2023';
  if (y >= 2024 && y <= 2025) return '2024–2025';
  if (y === 2026) return '2026';
  return null; // year outside any milestone — ignored
}

export default async function PageTimeline() {
  let photosByYear = {};

  try {
    // Fetch every timeline photo, then bucket by milestone. No hardcoded year
    // filter — that previously dropped all photos from 2017 onward.
    const rows = await query(
      `SELECT s3_url, label, year
       FROM timeline_photos
       ORDER BY display_order, id`
    );

    for (const row of rows) {
      const key = milestoneKeyFor(row.year);
      if (!key) continue;
      if (!photosByYear[key]) photosByYear[key] = [];
      photosByYear[key].push({
        src: row.s3_url,
        alt: row.label || `Ảnh ${row.year}`,
      });
    }
  } catch (e) {
    console.error('[timeline] DB error:', e.message);
  }

  return <TimelineClient photosByYear={photosByYear} />;
}