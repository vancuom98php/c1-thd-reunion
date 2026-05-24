#!/usr/bin/env node
// Generate a bcrypt hash for the default admin and print an INSERT statement.
// Usage:
//   node db/seed-admin.js                       # default: admin / admin123
//   node db/seed-admin.js myname mypassword     # custom credentials
//   node db/seed-admin.js | mysql -u root -p mydb   # pipe straight into mysql

const bcrypt = require('bcryptjs');

const username = process.argv[2] || 'admin';
const password = process.argv[3] || 'maiyeuc1';

const hash = bcrypt.hashSync(password, 10);

// MySQL needs single quotes escaped to '' inside a string literal. bcrypt hashes
// never contain single quotes today (alphabet is [./A-Za-z0-9$]), but be defensive.
const safeUser = username.replace(/'/g, "''");
const safeHash = hash.replace(/'/g, "''");

process.stdout.write(
`-- Seed admin: username='${username}' password='${password}'
INSERT INTO admins (username, password_hash) VALUES ('${safeUser}', '${safeHash}')
  ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);
`);
