export const LEVEL_THRESHOLDS = [
  { level: 1, title: 'Novice Coder', minXp: 0, maxXp: 300 },
  { level: 2, title: 'Code Apprentice', minXp: 300, maxXp: 700 },
  { level: 3, title: 'Syntax Explorer', minXp: 700, maxXp: 1200 },
  { level: 4, title: 'Logic Architect', minXp: 1200, maxXp: 1800 },
  { level: 5, title: 'Algorithm Wizard', minXp: 1800, maxXp: 2500 },
  { level: 6, title: 'UpSkillX Master', minXp: 2500, maxXp: 5000 }
];

export const getStudentRankInfo = (xp) => {
  const currentLevelInfo = LEVEL_THRESHOLDS.find(t => xp >= t.minXp && xp < t.maxXp) || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  
  const xpInCurrentLevel = xp - currentLevelInfo.minXp;
  const xpForNextLevel = currentLevelInfo.maxXp - currentLevelInfo.minXp;
  const progressPercentage = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpForNextLevel) * 100)));

  return {
    level: currentLevelInfo.level,
    title: currentLevelInfo.title,
    minXp: currentLevelInfo.minXp,
    maxXp: currentLevelInfo.maxXp,
    progressPercentage,
    xpNeeded: currentLevelInfo.maxXp - xp
  };
};

export const calculateCourseProgress = (courseId, completedLessons, passedQuizzes, completedPractice, coursesData) => {
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return 0;

  let totalItems = 0;
  let completedItems = 0;

  course.levels.forEach(lvl => {
    // 4 lessons per level typically (or 5 for C level 1)
    const levelLessonIds = Array.from({ length: lvl.lessonCount }, (_, i) => `${courseId}-${lvl.id}-${i + 1}`);
    totalItems += levelLessonIds.length;
    completedItems += levelLessonIds.filter(id => completedLessons.includes(id)).length;

    // 1 practice per level
    totalItems += 1;
    if (completedPractice.includes(lvl.practiceId)) {
      completedItems += 1;
    }

    // 1 quiz per level
    totalItems += 1;
    if (passedQuizzes[lvl.quizId] && passedQuizzes[lvl.quizId].passed) {
      completedItems += 1;
    }
  });

  if (totalItems === 0) return 0;
  return Math.round((completedItems / totalItems) * 100);
};
