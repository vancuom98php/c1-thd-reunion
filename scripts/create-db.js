#!/usr/bin/env node
// Create the configured database if it does not exist. Run before the first
// `yarn migration` on a fresh MySQL server.
//
// Usage:
//   node --env-file=.env.local scripts/create-db.js
//
// Unlike run-sql.js, this connects WITHOUT selecting a database so it can
// create one.

const mysql = require('mysql2/promise');

async function main() {
  const db = process.env.DB_DATABASE;
  if (!db) {
    console.error('DB_DATABASE is not set. Did you forget --env-file=.env.local?');
    process.exit(2);
  }
  // MySQL identifiers go inside backticks; reject anything that could escape them.
  if (!/^[A-Za-z0-9_]+$/.test(db)) {
    console.error(`DB_DATABASE "${db}" must match [A-Za-z0-9_]+ for safety.`);
    process.exit(2);
  }
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST     || '127.0.0.1',
    port:     Number(process.env.DB_PORT || 3306),
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: false,
  });
  try {
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${db}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log(`✓ Database \`${db}\` ready.`);
  } finally {
    await conn.end();
  }
}

main().catch(e => {
  console.error('✗ failed:', e.code ? `[${e.code}] ` : '', e.sqlMessage || e.message);
  process.exit(1);
});
