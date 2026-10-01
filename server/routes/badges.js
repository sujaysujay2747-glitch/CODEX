import express from 'express';
import { BADGES } from '../../src/data/badges.js';
import db from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/badges
router.get('/', authenticateToken, (req, res) => {
  const userBadges = db.prepare('SELECT badge_id FROM user_badges WHERE user_id = ?').all(req.user.id).map(r => r.badge_id);
  return res.json({ badges: BADGES, unlockedBadges: userBadges });
});

export default router;
