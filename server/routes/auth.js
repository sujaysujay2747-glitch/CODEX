import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'upskillx_super_secret_jwt_key_2026';

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username or Student ID is required' });
  }

  // Find user by username, email, or student_id
  let user = db.prepare('SELECT * FROM users WHERE username = ? OR email = ? OR student_id = ?').get(username, username, username);

  // For prototype convenience, if user doesn't exist, create demo profile on the fly
  if (!user) {
    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(password || 'password123', salt);
    const name = username.split('@')[0].split('.')[0] || 'Student';
    const email = username.includes('@') ? username : `${username}@student.upskillx.edu`;
    const studentId = `UX-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const insert = db.prepare(`
      INSERT INTO users (name, username, email, student_id, password_hash, xp, streak_count, last_activity_date, avatar_bg)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = insert.run(name, username, email, studentId, passHash, 850, 7, new Date().toISOString().split('T')[0], '#4f46e5');

    const newUserId = result.lastInsertRowid;
    user = db.prepare('SELECT * FROM users WHERE id = ?').get(newUserId);

    // Initial unlocks
    db.prepare('INSERT OR IGNORE INTO user_unlocked_levels (user_id, course_id, level_id) VALUES (?, ?, ?)').run(newUserId, 'python', 1);
    db.prepare('INSERT OR IGNORE INTO user_unlocked_levels (user_id, course_id, level_id) VALUES (?, ?, ?)').run(newUserId, 'c', 1);
    db.prepare('INSERT OR IGNORE INTO user_badges (user_id, badge_id) VALUES (?, ?)').run(newUserId, 'first_step');
  }

  const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      studentId: user.student_id,
      xp: user.xp,
      streakCount: user.streak_count,
      avatarBg: user.avatar_bg
    }
  });
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  const user = db.prepare('SELECT id, name, username, email, student_id, xp, streak_count, avatar_bg FROM users WHERE id = ?').get(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({ user });
});

export default router;
