const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { signToken, requireAuth } = require('../middleware/auth');

const router = express.Router();

const VALID_ROLES = ['child', 'parent', 'admin'];

router.post('/register', (req, res) => {
  const { username, password, role, child_name, age, theme, interests, favorite_colors, parent_email } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }
  const userRole = role || 'child';
  if (!VALID_ROLES.includes(userRole)) {
    return res.status(400).json({ error: `role must be one of ${VALID_ROLES.join(', ')}` });
  }

  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    return res.status(409).json({ error: 'username already taken' });
  }

  const hash = bcrypt.hashSync(password, 10);
  const result = db
    .prepare(
      `INSERT INTO users
        (username, password_hash, role, child_name, age, theme, interests, favorite_colors, parent_email)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      username,
      hash,
      userRole,
      child_name || null,
      age || null,
      theme || null,
      interests || null,
      favorite_colors || null,
      parent_email || null
    );

  const user = { id: result.lastInsertRowid, username, role: userRole };
  const token = signToken(user);
  res.status(201).json({ token, user });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const row = db
    .prepare('SELECT id, username, password_hash, role FROM users WHERE username = ?')
    .get(username);

  if (!row || !bcrypt.compareSync(password, row.password_hash)) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const user = { id: row.id, username: row.username, role: row.role };
  const token = signToken(user);
  res.json({ token, user });
});

router.get('/me', requireAuth, (req, res) => {
  const row = db
    .prepare(
      `SELECT id, username, role, child_name, age, theme, interests, favorite_colors, parent_email, created_at
       FROM users WHERE id = ?`
    )
    .get(req.user.id);
  if (!row) return res.status(404).json({ error: 'user not found' });
  res.json({ user: row });
});

module.exports = router;
