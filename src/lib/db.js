import mysql from 'mysql2/promise';

// Single shared connection pool. Lazy-initialised so missing env vars do not
// crash the build — first query throws instead.
let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE,
      ssl: { rejectUnauthorized: true },
      waitForConnections: true,
      connectionLimit: 10,
      dateStrings: false,
      timezone: 'Z',
      charset: 'utf8mb4',
    });
  }
  return pool;
}

// We use `pool.query` (client-side escaping) instead of `pool.execute`
// (server-side prepared statements) because mysql2's binary protocol cannot
// bind `LIMIT ?` / `OFFSET ?` placeholders. Both call paths parameterise
// values via `?`, so SQL injection protection is identical — only the
// prepared-statement plan cache is skipped.
export async function query(sql, params = []) {
  const [rows] = await getPool().query(sql, params);
  return rows;
}
