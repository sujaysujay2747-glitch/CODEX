import express from 'express';
import db from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { BADGES } from '../../src/data/badges.js';

const router = express.Router();

// Helper: Add XP & update user
const addXP = (userId, amount) => {
  db.prepare('UPDATE users SET xp = xp + ? WHERE id = ?').run(amount, userId);
  const user = db.prepare('SELECT xp FROM users WHERE id = ?').get(userId);
  return user.xp;
};

// Helper: Update Streak
const updateStreak = (userId) => {
  const user = db.prepare('SELECT streak_count, last_activity_date FROM users WHERE id = ?').get(userId);
  const today = new Date().toISOString().split('T')[0];

  if (user.last_activity_date === today) {
    return user.streak_count;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let newCount = user.streak_count;

  if (user.last_activity_date === yesterday) {
    newCount += 1;
  } else if (!user.last_activity_date) {
    newCount = 1;
  } else {
    newCount = 1;
  }

  db.prepare('UPDATE users SET streak_count = ?, last_activity_date = ? WHERE id = ?').run(newCount, today, userId);

  if (newCount >= 7) {
    unlockBadge(userId, 'streak_master');
  }

  return newCount;
};

// Helper: Unlock Badge
const unlockBadge = (userId, badgeId) => {
  const existing = db.prepare('SELECT * FROM user_badges WHERE user_id = ? AND badge_id = ?').get(userId, badgeId);
  if (!existing) {
    db.prepare('INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)').run(userId, badgeId);
    const badgeInfo = BADGES.find(b => b.id === badgeId);
    const badgeName = badgeInfo ? badgeInfo.name : badgeId;
    addActivity(userId, 'badge', `Earned ${badgeName} badge 🏆`, 'Award');
    return true;
  }
  return false;
};

// Helper: Add Activity Log
const addActivity = (userId, type, text, icon = 'CheckCircle2') => {
  const id = `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  db.prepare('INSERT INTO user_activities (id, user_id, type, text, icon) VALUES (?, ?, ?, ?, ?)').run(id, userId, type, text, icon);
};

// GET /api/progress/state
router.get('/state', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const user = db.prepare('SELECT id, name, username, email, student_id, xp, streak_count, avatar_bg FROM users WHERE id = ?').get(userId);
  const lessons = db.prepare('SELECT lesson_id FROM user_lessons WHERE user_id = ?').all(userId).map(r => r.lesson_id);
  const practice = db.prepare('SELECT practice_id FROM user_practice WHERE user_id = ?').all(userId).map(r => r.practice_id);
  const quizzesList = db.prepare('SELECT quiz_id, score_percentage, passed FROM user_quizzes WHERE user_id = ?').all(userId);
  const badges = db.prepare('SELECT badge_id FROM user_badges WHERE user_id = ?').all(userId).map(r => r.badge_id);
  const challenges = db.prepare('SELECT challenge_id FROM user_challenges WHERE user_id = ?').all(userId).map(r => r.challenge_id);
  const unlockedRows = db.prepare('SELECT course_id, level_id FROM user_unlocked_levels WHERE user_id = ?').all(userId);
  const activities = db.prepare('SELECT id, type, text, icon, created_at FROM user_activities WHERE user_id = ? ORDER BY created_at DESC LIMIT 20').all(userId);

  const passedQuizzes = {};
  quizzesList.forEach(q => {
    passedQuizzes[q.quiz_id] = { passed: Boolean(q.passed), scorePercentage: q.score_percentage };
  });

  const unlockedLevels = { python: [1], c: [1] };
  unlockedRows.forEach(row => {
    if (!unlockedLevels[row.course_id]) unlockedLevels[row.course_id] = [1];
    if (!unlockedLevels[row.course_id].includes(row.level_id)) {
      unlockedLevels[row.course_id].push(row.level_id);
    }
  });

  return res.json({
    user,
    xp: user.xp,
    streak: { count: user.streak_count, lastActivityDate: user.last_activity_date },
    completedLessons: lessons,
    completedPractice: practice,
    passedQuizzes,
    badges,
    completedChallenges: challenges,
    unlockedLevels,
    activities
  });
});

// POST /api/progress/complete-lesson
router.post('/complete-lesson', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { lessonId, lessonTitle, courseId, levelId } = req.body;

  const existing = db.prepare('SELECT * FROM user_lessons WHERE user_id = ? AND lesson_id = ?').get(userId, lessonId);
  let isFirstTime = false;
  let xpGained = 0;

  if (!existing) {
    isFirstTime = true;
    db.prepare('INSERT INTO user_lessons (user_id, lesson_id) VALUES (?, ?)').run(userId, lessonId);
    xpGained = 20;
    addXP(userId, xpGained);
    updateStreak(userId);
    unlockBadge(userId, 'first_step');
    addActivity(userId, 'lesson', `Completed lesson: ${lessonTitle}`, 'BookOpen');
  }

  return res.json({ isFirstTime, xpGained });
});

// POST /api/progress/complete-practice
router.post('/complete-practice', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { practiceId, problemTitle } = req.body;

  const existing = db.prepare('SELECT * FROM user_practice WHERE user_id = ? AND practice_id = ?').get(userId, practiceId);
  let isFirstTime = false;
  let xpGained = 0;

  if (!existing) {
    isFirstTime = true;
    db.prepare('INSERT INTO user_practice (user_id, practice_id) VALUES (?, ?)').run(userId, practiceId);
    xpGained = 10;
    addXP(userId, xpGained);
    updateStreak(userId);
    unlockBadge(userId, 'problem_solver');
    addActivity(userId, 'practice', `Completed practice: ${problemTitle}`, 'Code2');
  }

  return res.json({ isFirstTime, xpGained });
});

// POST /api/progress/submit-quiz
router.post('/submit-quiz', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { quizId, scorePercentage, correctCount, totalQuestions, courseId, levelId } = req.body;

  const isPassed = scorePercentage >= 60;
  const existing = db.prepare('SELECT * FROM user_quizzes WHERE user_id = ? AND quiz_id = ?').get(userId, quizId);
  let isFirstTimePass = false;
  let xpGained = 0;
  let levelUnlocked = false;

  if (isPassed) {
    if (!existing || !existing.passed) {
      isFirstTimePass = true;
      xpGained = 50;
      addXP(userId, xpGained);
      updateStreak(userId);

      if (scorePercentage === 100) {
        unlockBadge(userId, 'quiz_master');
      }

      const nextLevel = levelId + 1;
      if (nextLevel <= 4) {
        db.prepare('INSERT OR IGNORE INTO user_unlocked_levels (user_id, course_id, level_id) VALUES (?, ?, ?)').run(userId, courseId, nextLevel);
        levelUnlocked = true;
      }

      if (courseId === 'python' && levelId === 1) unlockBadge(userId, 'python_learner');
      if (courseId === 'c' && levelId === 1) unlockBadge(userId, 'c_learner');

      addActivity(userId, 'quiz', `Passed Level ${levelId} Quiz with ${scorePercentage}% 🎉`, 'Trophy');
    }

    db.prepare(`
      INSERT INTO user_quizzes (user_id, quiz_id, score_percentage, correct_count, total_questions, passed)
      VALUES (?, ?, ?, ?, ?, 1)
      ON CONFLICT(user_id, quiz_id) DO UPDATE SET score_percentage = excluded.score_percentage, passed = 1
    `).run(userId, quizId, scorePercentage, correctCount, totalQuestions);
  }

  return res.json({ isPassed, isFirstTimePass, xpGained, levelUnlocked });
});

// POST /api/progress/daily-challenge
router.post('/daily-challenge', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { challengeId, challengeTitle, rewardXp } = req.body;

  const existing = db.prepare('SELECT * FROM user_challenges WHERE user_id = ? AND challenge_id = ?').get(userId, challengeId);
  let isFirstTime = false;
  let xpGained = 0;

  if (!existing) {
    isFirstTime = true;
    db.prepare('INSERT INTO user_challenges (user_id, challenge_id) VALUES (?, ?)').run(userId, challengeId);
    xpGained = rewardXp || 30;
    addXP(userId, xpGained);
    updateStreak(userId);
    addActivity(userId, 'challenge', `Completed Daily Challenge: ${challengeTitle} (+${xpGained} XP)`, 'Flame');
  }

  return res.json({ isFirstTime, xpGained });
});

export default router;
