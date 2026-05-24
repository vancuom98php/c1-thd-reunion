#!/usr/bin/env node
// Generate blur_data_url values for gallery photos using sharp.
//
// Produces real 8×8 LQIP thumbnails (JPEG, 70% quality) encoded as data URIs.
//
// Usage:
//   node scripts/generate-blur.js                # prints UPDATE statements
//   node scripts/generate-blur.js | mysql -u root -p c1_reunion
//
// Load env vars via: node --env-file=.env.local scripts/generate-blur.js

const sharp = require('sharp');

async function generateBlur(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const blurBuf = await sharp(buffer)
    .resize(8, 8, { fit: 'cover' })
    .jpeg({ quality: 70 })
    .toBuffer();
  return 'data:image/jpeg;base64,' + blurBuf.toString('base64');
}

async function main() {
  const mysql = require('mysql2/promise');
  const pool = mysql.createPool({
    host:     process.env.DB_HOST     || '127.0.0.1',
    port:     Number(process.env.DB_PORT || 3306),
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE,
  });
  const [rows] = await pool.execute(
    'SELECT id, s3_url FROM gallery_photos WHERE blur_data_url IS NULL OR blur_data_url = ""'
  );

  let success = 0;
  let skipped = 0;

  for (const row of rows) {
    try {
      const blur = await generateBlur(row.s3_url);
      const safe = blur.replace(/'/g, "''");
      process.stdout.write(
        `UPDATE gallery_photos SET blur_data_url='${safe}' WHERE id=${row.id};\n`
      );
      success++;
    } catch (e) {
      console.error(`[generate-blur] skipping id=${row.id}: ${e.message}`);
      skipped++;
    }
  }

  console.error(`[generate-blur] done: ${success} generated, ${skipped} skipped`);
  await pool.end();
}

main().catch(e => {
  console.error('[generate-blur] error:', e.message);
  process.exit(1);
});
