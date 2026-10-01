import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// GET /api/leaderboard
router.get('/', (req, res) => {
  const users = db.prepare(`
    SELECT 
      u.id, 
      u.name, 
      u.username, 
      u.student_id, 
      u.xp, 
      u.streak_count AS streak, 
      u.avatar_bg AS avatarBg,
      (SELECT COUNT(*) FROM user_badges b WHERE b.user_id = u.id) AS badgesCount
    FROM users u
    ORDER BY u.xp DESC
  `).all();

  const leaderboard = users.map((u, index) => {
    let level = 1;
    if (u.xp >= 1200) level = 4;
    else if (u.xp >= 700) level = 3;
    else if (u.xp >= 300) level = 2;

    return {
      id: `student-${u.id}`,
      dbId: u.id,
      rank: index + 1,
      name: u.name,
      username: u.username,
      studentId: u.student_id,
      xp: u.xp,
      level,
      badgesCount: u.badgesCount,
      streak: u.streak,
      avatarBg: u.avatarBg
    };
  });

  return res.json({ leaderboard });
});

export default router;
