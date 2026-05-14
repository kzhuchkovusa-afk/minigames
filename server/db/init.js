require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./index');

const reset = process.argv.includes('--reset');

if (reset) {
  db.exec(`
    DROP TABLE IF EXISTS scores;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS users;
  `);
  console.log('Dropped existing tables.');
}

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);
console.log(`Schema applied at ${db.name || module.exports?.dbPath || ''}`);
