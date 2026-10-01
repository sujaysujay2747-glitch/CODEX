import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'upskillx.db');
const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

export const initDb = () => {
  // 1. Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      student_id TEXT DEFAULT 'UX-2026-8942',
      password_hash TEXT NOT NULL,
      xp INTEGER DEFAULT 850,
      streak_count INTEGER DEFAULT 7,
      last_activity_date TEXT,
      avatar_bg TEXT DEFAULT '#4f46e5',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 2. Completed Lessons Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_lessons (
      user_id INTEGER,
      lesson_id TEXT,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, lesson_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // 3. Completed Practice Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_practice (
      user_id INTEGER,
      practice_id TEXT,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, practice_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // 4. Passed Quizzes Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_quizzes (
      user_id INTEGER,
      quiz_id TEXT,
      score_percentage INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      passed BOOLEAN DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, quiz_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // 5. User Badges Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_badges (
      user_id INTEGER,
      badge_id TEXT,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, badge_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // 6. User Unlocked Levels Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_unlocked_levels (
      user_id INTEGER,
      course_id TEXT,
      level_id INTEGER,
      PRIMARY KEY (user_id, course_id, level_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // 7. Completed Challenges Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_challenges (
      user_id INTEGER,
      challenge_id TEXT,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, challenge_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // 8. User Activity Timeline Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_activities (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      type TEXT,
      text TEXT,
      icon TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Seed default Demo Student Sujay if empty
  const userCheck = db.prepare('SELECT COUNT(*) AS count FROM users').get();
  if (userCheck.count === 0) {
    seedDefaultData();
  }
};

const seedDefaultData = () => {
  const salt = bcrypt.genSaltSync(10);
  const defaultPassword = bcrypt.hashSync('password123', salt);

  // Insert Main Demo User: Sujay
  const insertUser = db.prepare(`
    INSERT INTO users (name, username, email, student_id, password_hash, xp, streak_count, last_activity_date, avatar_bg)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const sujayRes = insertUser.run(
    'Sujay',
    'sujay_dev',
    'sujay@college.edu',
    'UX-2026-8942',
    defaultPassword,
    850,
    7,
    new Date().toISOString().split('T')[0],
    '#4f46e5'
  );

  const sujayId = sujayRes.lastInsertRowid;

  // Insert Mock Peer Students for Leaderboard
  insertUser.run('Aria Sharma', 'aria_codes', 'aria@college.edu', 'UX-2026-1024', defaultPassword, 1420, 14, '2026-09-30', '#8b5cf6');
  insertUser.run('Rohan Patel', 'rohan_p', 'rohan@college.edu', 'UX-2026-3091', defaultPassword, 1180, 11, '2026-09-30', '#ec4899');
  insertUser.run('Ananya Roy', 'ananya_r', 'ananya@college.edu', 'UX-2026-4482', defaultPassword, 790, 5, '2026-09-29', '#10b981');
  insertUser.run('Vikram Singh', 'vikram_s', 'vikram@college.edu', 'UX-2026-5510', defaultPassword, 640, 4, '2026-09-29', '#f59e0b');

  // Insert Sujay's Initial Progress
  const insertLesson = db.prepare('INSERT INTO user_lessons (user_id, lesson_id) VALUES (?, ?)');
  insertLesson.run(sujayId, 'py-1-1');
  insertLesson.run(sujayId, 'py-1-2');

  const insertPractice = db.prepare('INSERT INTO user_practice (user_id, practice_id) VALUES (?, ?)');
  insertPractice.run(sujayId, 'py-prac-1');

  const insertBadge = db.prepare('INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)');
  insertBadge.run(sujayId, 'first_step');

  const insertLevel = db.prepare('INSERT INTO user_unlocked_levels (user_id, course_id, level_id) VALUES (?, ?, ?)');
  insertLevel.run(sujayId, 'python', 1);
  insertLevel.run(sujayId, 'python', 2);
  insertLevel.run(sujayId, 'c', 1);

  const insertActivity = db.prepare('INSERT INTO user_activities (id, user_id, type, text, icon) VALUES (?, ?, ?, ?, ?)');
  insertActivity.run('act-1', sujayId, 'lesson', 'Completed Variables lesson in Python', 'BookOpen');
  insertActivity.run('act-2', sujayId, 'badge', 'Earned First Step badge 🏆', 'Award');
  insertActivity.run('act-3', sujayId, 'practice', 'Completed Beginner Python practice problem', 'Code');
};

export default db;
