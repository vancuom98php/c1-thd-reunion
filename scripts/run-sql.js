#!/usr/bin/env node
// Apply a .sql file to the configured database via mysql2/promise.
// Used by the `migration` and `seeder` npm scripts.
//
// Usage:
//   node --env-file=.env.local scripts/run-sql.js db/schema.sql
//
// Loads connection details from these env vars (same as src/lib/db.js):
//   DB_HOST  DB_PORT  DB_USER  DB_PASSWORD  DB_DATABASE
//
// The mysql2 driver is invoked with `multipleStatements: true` so a single
// file can hold many statements separated by `;`. We do NOT enable that flag
// on the runtime app pool — only this offline tool.

const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: run-sql.js <path/to/file.sql>');
    process.exit(2);
  }
  const abs = path.resolve(file);
  if (!fs.existsSync(abs)) {
    console.error(`File not found: ${abs}`);
    process.exit(2);
  }
  const sql = fs.readFileSync(abs, 'utf8').trim();
  if (!sql) {
    console.log(`(${path.basename(abs)} is empty — nothing to run)`);
    return;
  }
  if (!process.env.DB_DATABASE) {
    console.error('DB_DATABASE is not set. Did you forget --env-file=.env.local?');
    process.exit(2);
  }

  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST     || '127.0.0.1',
    port:     Number(process.env.DB_PORT || 3306),
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE,
    multipleStatements: true,
    charset: 'utf8mb4',
    // TiDB Cloud (and most managed MySQL) require TLS. Toggle with DB_SSL=true
    // so the same script still works against a plain local MySQL.
    ...(process.env.DB_SSL === 'true' && {
      ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    }),
  });

  console.log(`→ Applying ${path.relative(process.cwd(), abs)} to ${process.env.DB_DATABASE}…`);
  try {
    await conn.query(sql);
    console.log('✓ done');
  } finally {
    await conn.end();
  }
}

main().catch(e => {
  console.error('✗ failed:', e.code ? `[${e.code}] ` : '', e.sqlMessage || e.message);
  process.exit(1);
});
