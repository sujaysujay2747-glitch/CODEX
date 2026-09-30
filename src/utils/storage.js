import { BADGES } from '../data/badges';

const STORAGE_KEYS = {
  USER: 'upskillx_user',
  AUTH: 'upskillx_auth',
  PROGRESS: 'upskillx_progress',
  XP: 'upskillx_xp',
  LESSONS: 'upskillx_lessons',
  QUIZZES: 'upskillx_quizzes',
  PRACTICE: 'upskillx_practice',
  BADGES: 'upskillx_badges',
  STREAK: 'upskillx_streak',
  ACTIVITIES: 'upskillx_activities',
  CHALLENGES: 'upskillx_challenges',
  UNLOCKED_LEVELS: 'upskillx_unlocked_levels'
};

const DEFAULT_USER = {
  name: 'Sujay',
  username: 'sujay_dev',
  studentId: 'UX-2026-8942',
  avatarBg: '#4f46e5',
  email: 'sujay@college.edu'
};

const DEFAULT_INITIAL_STATE = {
  user: DEFAULT_USER,
  auth: { isAuthenticated: true, loginTime: new Date().toISOString() },
  xp: 850,
  streak: { count: 7, lastActivityDate: new Date().toISOString().split('T')[0], recoveryAvailable: false },
  unlockedLevels: { python: [1, 2], c: [1] },
  completedLessons: ['py-1-1', 'py-1-2'],
  completedPractice: ['py-prac-1'],
  passedQuizzes: {}, // e.g. { 'py-quiz-1': { score: 80, passed: true } }
  badges: ['first_step'],
  completedChallenges: [],
  activities: [
    { id: 'act-1', type: 'lesson', text: 'Completed Variables lesson in Python', relativeTime: '2 hours ago', icon: 'CheckCircle2' },
    { id: 'act-2', type: 'badge', text: 'Earned First Step badge 🏆', relativeTime: 'Yesterday', icon: 'Award' },
    { id: 'act-3', type: 'practice', text: 'Completed Beginner Python practice problem', relativeTime: '2 days ago', icon: 'Code' }
  ]
};

// Safe JSON Parse Helper
const getJsonItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

// Safe JSON Set Helper
const setJsonItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
};

export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.AUTH)) {
    setJsonItem(STORAGE_KEYS.USER, DEFAULT_INITIAL_STATE.user);
    setJsonItem(STORAGE_KEYS.AUTH, DEFAULT_INITIAL_STATE.auth);
    setJsonItem(STORAGE_KEYS.XP, DEFAULT_INITIAL_STATE.xp);
    setJsonItem(STORAGE_KEYS.STREAK, DEFAULT_INITIAL_STATE.streak);
    setJsonItem(STORAGE_KEYS.UNLOCKED_LEVELS, DEFAULT_INITIAL_STATE.unlockedLevels);
    setJsonItem(STORAGE_KEYS.LESSONS, DEFAULT_INITIAL_STATE.completedLessons);
    setJsonItem(STORAGE_KEYS.PRACTICE, DEFAULT_INITIAL_STATE.completedPractice);
    setJsonItem(STORAGE_KEYS.QUIZZES, DEFAULT_INITIAL_STATE.passedQuizzes);
    setJsonItem(STORAGE_KEYS.BADGES, DEFAULT_INITIAL_STATE.badges);
    setJsonItem(STORAGE_KEYS.CHALLENGES, DEFAULT_INITIAL_STATE.completedChallenges);
    setJsonItem(STORAGE_KEYS.ACTIVITIES, DEFAULT_INITIAL_STATE.activities);
  }
};

export const getAppState = () => {
  initializeStorage();
  return {
    user: getJsonItem(STORAGE_KEYS.USER, DEFAULT_USER),
    auth: getJsonItem(STORAGE_KEYS.AUTH, { isAuthenticated: false }),
    xp: getJsonItem(STORAGE_KEYS.XP, 850),
    streak: getJsonItem(STORAGE_KEYS.STREAK, { count: 7, lastActivityDate: '' }),
    unlockedLevels: getJsonItem(STORAGE_KEYS.UNLOCKED_LEVELS, { python: [1], c: [1] }),
    completedLessons: getJsonItem(STORAGE_KEYS.LESSONS, []),
    completedPractice: getJsonItem(STORAGE_KEYS.PRACTICE, []),
    passedQuizzes: getJsonItem(STORAGE_KEYS.QUIZZES, {}),
    badges: getJsonItem(STORAGE_KEYS.BADGES, ['first_step']),
    completedChallenges: getJsonItem(STORAGE_KEYS.CHALLENGES, []),
    activities: getJsonItem(STORAGE_KEYS.ACTIVITIES, [])
  };
};

export const loginUser = (username, studentId = 'UX-2026-8942') => {
  const user = {
    name: username.split('@')[0].split('.')[0] || 'Student',
    username: username,
    studentId: studentId,
    avatarBg: '#4f46e5',
    email: username.includes('@') ? username : `${username}@student.upskillx.edu`
  };
  setJsonItem(STORAGE_KEYS.USER, user);
  setJsonItem(STORAGE_KEYS.AUTH, { isAuthenticated: true, loginTime: new Date().toISOString() });
  return user;
};

export const logoutUser = () => {
  setJsonItem(STORAGE_KEYS.AUTH, { isAuthenticated: false });
};

export const resetAppState = () => {
  localStorage.clear();
  setJsonItem(STORAGE_KEYS.USER, DEFAULT_INITIAL_STATE.user);
  setJsonItem(STORAGE_KEYS.AUTH, DEFAULT_INITIAL_STATE.auth);
  setJsonItem(STORAGE_KEYS.XP, DEFAULT_INITIAL_STATE.xp);
  setJsonItem(STORAGE_KEYS.STREAK, DEFAULT_INITIAL_STATE.streak);
  setJsonItem(STORAGE_KEYS.UNLOCKED_LEVELS, DEFAULT_INITIAL_STATE.unlockedLevels);
  setJsonItem(STORAGE_KEYS.LESSONS, DEFAULT_INITIAL_STATE.completedLessons);
  setJsonItem(STORAGE_KEYS.PRACTICE, DEFAULT_INITIAL_STATE.completedPractice);
  setJsonItem(STORAGE_KEYS.QUIZZES, DEFAULT_INITIAL_STATE.passedQuizzes);
  setJsonItem(STORAGE_KEYS.BADGES, DEFAULT_INITIAL_STATE.badges);
  setJsonItem(STORAGE_KEYS.CHALLENGES, DEFAULT_INITIAL_STATE.completedChallenges);
  setJsonItem(STORAGE_KEYS.ACTIVITIES, DEFAULT_INITIAL_STATE.activities);
  return getAppState();
};

export const addXP = (amount, reason) => {
  const currentXP = getJsonItem(STORAGE_KEYS.XP, 0);
  const newXP = currentXP + amount;
  setJsonItem(STORAGE_KEYS.XP, newXP);
  return newXP;
};

export const updateStreakOnActivity = () => {
  const streak = getJsonItem(STORAGE_KEYS.STREAK, { count: 1, lastActivityDate: '' });
  const today = new Date().toISOString().split('T')[0];
  
  if (streak.lastActivityDate === today) {
    // Already updated today
    return { updated: false, count: streak.count };
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let newCount = streak.count;

  if (streak.lastActivityDate === yesterday) {
    newCount += 1;
  } else if (!streak.lastActivityDate) {
    newCount = 1;
  } else {
    // Streak broken, reset to 1
    newCount = 1;
  }

  const newStreak = { count: newCount, lastActivityDate: today, recoveryAvailable: false };
  setJsonItem(STORAGE_KEYS.STREAK, newStreak);
  
  // Check badge for 7 day streak
  if (newCount >= 7) {
    unlockBadge('streak_master');
  }

  return { updated: true, count: newCount };
};

export const unlockBadge = (badgeId) => {
  const badges = getJsonItem(STORAGE_KEYS.BADGES, []);
  if (!badges.includes(badgeId)) {
    const newBadges = [...badges, badgeId];
    setJsonItem(STORAGE_KEYS.BADGES, newBadges);
    
    // Add activity
    const badgeInfo = BADGES.find(b => b.id === badgeId);
    const badgeName = badgeInfo ? badgeInfo.name : badgeId;
    addActivity('badge', `Earned ${badgeName} badge 🏆`, 'Just now', 'Award');
    return { unlocked: true, badgeName };
  }
  return { unlocked: false };
};

export const addActivity = (type, text, relativeTime = 'Just now', icon = 'CheckCircle2') => {
  const activities = getJsonItem(STORAGE_KEYS.ACTIVITIES, []);
  const newActivity = {
    id: `act-${Date.now()}`,
    type,
    text,
    relativeTime,
    icon
  };
  const updated = [newActivity, ...activities.slice(0, 19)];
  setJsonItem(STORAGE_KEYS.ACTIVITIES, updated);
  return updated;
};

export const completeLessonAction = (lessonId, lessonTitle, courseId, levelId) => {
  const completedLessons = getJsonItem(STORAGE_KEYS.LESSONS, []);
  let xpGained = 0;
  let isFirstTime = false;

  if (!completedLessons.includes(lessonId)) {
    isFirstTime = true;
    const newLessons = [...completedLessons, lessonId];
    setJsonItem(STORAGE_KEYS.LESSONS, newLessons);

    // Award +20 XP for lesson
    xpGained = 20;
    addXP(xpGained, `Completed lesson: ${lessonTitle}`);

    // Update streak
    updateStreakOnActivity();

    // Check first step badge
    unlockBadge('first_step');

    // Add activity log
    addActivity('lesson', `Completed lesson: ${lessonTitle}`, 'Just now', 'BookOpen');
  }

  return { isFirstTime, xpGained, totalLessons: getJsonItem(STORAGE_KEYS.LESSONS, []) };
};

export const completePracticeAction = (practiceId, problemTitle) => {
  const completedPractice = getJsonItem(STORAGE_KEYS.PRACTICE, []);
  let xpGained = 0;
  let isFirstTime = false;

  if (!completedPractice.includes(practiceId)) {
    isFirstTime = true;
    const newPractice = [...completedPractice, practiceId];
    setJsonItem(STORAGE_KEYS.PRACTICE, newPractice);

    // Award +10 XP for practice
    xpGained = 10;
    addXP(xpGained, `Passed practice: ${problemTitle}`);

    // Update streak
    updateStreakOnActivity();

    // Check problem solver badge
    unlockBadge('problem_solver');

    // Add activity log
    addActivity('practice', `Completed practice: ${problemTitle}`, 'Just now', 'Code2');
  }

  return { isFirstTime, xpGained };
};

export const submitQuizAction = (quizId, scorePercentage, correctCount, totalQuestions, courseId, levelId) => {
  const passedQuizzes = getJsonItem(STORAGE_KEYS.QUIZZES, {});
  const isPassed = scorePercentage >= 60;
  let xpGained = 0;
  let levelUnlocked = false;
  let isFirstTimePass = false;

  if (isPassed) {
    if (!passedQuizzes[quizId] || !passedQuizzes[quizId].passed) {
      isFirstTimePass = true;
      xpGained = 50;
      addXP(xpGained, `Passed quiz ${quizId}`);
      updateStreakOnActivity();

      // Check quiz master badge for 100% score
      if (scorePercentage === 100) {
        unlockBadge('quiz_master');
      }

      // Unlock next level in course!
      const unlockedLevels = getJsonItem(STORAGE_KEYS.UNLOCKED_LEVELS, { python: [1], c: [1] });
      const currentCourseLevels = unlockedLevels[courseId] || [1];
      const nextLevel = levelId + 1;
      if (nextLevel <= 4 && !currentCourseLevels.includes(nextLevel)) {
        unlockedLevels[courseId] = [...currentCourseLevels, nextLevel];
        setJsonItem(STORAGE_KEYS.UNLOCKED_LEVELS, unlockedLevels);
        levelUnlocked = true;
      }

      // Check level 1 badges
      if (courseId === 'python' && levelId === 1) {
        unlockBadge('python_learner');
      }
      if (courseId === 'c' && levelId === 1) {
        unlockBadge('c_learner');
      }

      addActivity('quiz', `Passed Level ${levelId} Quiz with ${scorePercentage}% 🎉`, 'Just now', 'Trophy');
    }

    passedQuizzes[quizId] = {
      passed: true,
      scorePercentage,
      correctCount,
      totalQuestions,
      updatedAt: new Date().toISOString()
    };
    setJsonItem(STORAGE_KEYS.QUIZZES, passedQuizzes);
  }

  return { isPassed, isFirstTimePass, xpGained, levelUnlocked, scorePercentage };
};

export const completeDailyChallengeAction = (challengeId, challengeTitle, rewardXp) => {
  const completedChallenges = getJsonItem(STORAGE_KEYS.CHALLENGES, []);
  let xpGained = 0;
  let isFirstTime = false;

  if (!completedChallenges.includes(challengeId)) {
    isFirstTime = true;
    setJsonItem(STORAGE_KEYS.CHALLENGES, [...completedChallenges, challengeId]);
    xpGained = rewardXp || 30;
    addXP(xpGained, `Completed daily challenge: ${challengeTitle}`);
    updateStreakOnActivity();
    addActivity('challenge', `Completed Daily Challenge: ${challengeTitle} (+${xpGained} XP)`, 'Just now', 'Flame');
  }

  return { isFirstTime, xpGained };
};
