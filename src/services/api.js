const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('upskillx_token');
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

export const api = {
  // Health check
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Auth
  login: async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    if (data.token) {
      localStorage.setItem('upskillx_token', data.token);
    }
    return data;
  },

  // Get Progress State
  getProgressState: async () => {
    const res = await fetch(`${API_BASE_URL}/progress/state`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch progress');
    return await res.json();
  },

  // Complete Lesson
  completeLesson: async (lessonId, lessonTitle, courseId, levelId) => {
    const res = await fetch(`${API_BASE_URL}/progress/complete-lesson`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ lessonId, lessonTitle, courseId, levelId })
    });
    return await res.json();
  },

  // Complete Practice
  completePractice: async (practiceId, problemTitle) => {
    const res = await fetch(`${API_BASE_URL}/progress/complete-practice`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ practiceId, problemTitle })
    });
    return await res.json();
  },

  // Submit Quiz
  submitQuiz: async (quizId, scorePercentage, correctCount, totalQuestions, courseId, levelId) => {
    const res = await fetch(`${API_BASE_URL}/progress/submit-quiz`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quizId, scorePercentage, correctCount, totalQuestions, courseId, levelId })
    });
    return await res.json();
  },

  // Daily Challenge
  completeDailyChallenge: async (challengeId, challengeTitle, rewardXp) => {
    const res = await fetch(`${API_BASE_URL}/progress/daily-challenge`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ challengeId, challengeTitle, rewardXp })
    });
    return await res.json();
  },

  // Leaderboard
  getLeaderboard: async () => {
    const res = await fetch(`${API_BASE_URL}/leaderboard`);
    return await res.json();
  },

  // AI Chat
  sendAiMessage: async (message, currentTopic, courseContext) => {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, currentTopic, courseContext })
    });
    return await res.json();
  }
};
