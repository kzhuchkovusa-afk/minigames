require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./index');

const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(adminUsername);
if (existing) {
  console.log(`Admin "${adminUsername}" already exists (id=${existing.id}). Skipping seed.`);
  process.exit(0);
}

const hash = bcrypt.hashSync(adminPassword, 10);
const result = db
  .prepare("INSERT INTO users (username, password_hash, role) VALUES (?, ?, 'admin')")
  .run(adminUsername, hash);

console.log(`Seeded admin "${adminUsername}" (id=${result.lastInsertRowid}).`);
console.log('Default password (change it!):', adminPassword);
