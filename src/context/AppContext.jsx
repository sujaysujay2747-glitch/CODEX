import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAppState,
  loginUser,
  logoutUser,
  resetAppState,
  completeLessonAction,
  completePracticeAction,
  submitQuizAction,
  completeDailyChallengeAction
} from '../utils/storage';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState(() => getAppState());
  const [toasts, setToasts] = useState([]);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');

  const refreshState = () => {
    setAppState(getAppState());
  };

  const addToast = (title, message, type = 'success', icon = 'Sparkles') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type, icon }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const login = (username, studentId) => {
    loginUser(username, studentId);
    refreshState();
    addToast('Welcome to UpSkillX!', `Logged in as ${username}`, 'info', 'LogIn');
  };

  const logout = () => {
    logoutUser();
    refreshState();
    addToast('Logged Out', 'You have been safely logged out.', 'info', 'LogOut');
  };

  const resetAllData = () => {
    resetAppState();
    refreshState();
    addToast('Data Reset', 'Prototype demo data has been restored.', 'info', 'RotateCcw');
  };

  const completeLesson = (lessonId, lessonTitle, courseId, levelId) => {
    const result = completeLessonAction(lessonId, lessonTitle, courseId, levelId);
    refreshState();
    if (result.isFirstTime) {
      addToast('Lesson Completed! 🎉', `+20 XP awarded for ${lessonTitle}`, 'success', 'BookOpen');
      triggerConfetti();
    } else {
      addToast('Lesson Reviewed', `Already completed prior. No duplicate XP.`, 'info', 'CheckCircle');
    }
    return result;
  };

  const completePractice = (practiceId, problemTitle) => {
    const result = completePracticeAction(practiceId, problemTitle);
    refreshState();
    if (result.isFirstTime) {
      addToast('Practice Passed! 💻', `+10 XP awarded for ${problemTitle}`, 'success', 'Code');
      triggerConfetti();
    } else {
      addToast('Practice Completed', `Review mode. No duplicate XP.`, 'info', 'Check');
    }
    return result;
  };

  const submitQuiz = (quizId, scorePercentage, correctCount, totalQuestions, courseId, levelId) => {
    const result = submitQuizAction(quizId, scorePercentage, correctCount, totalQuestions, courseId, levelId);
    refreshState();
    if (result.isPassed) {
      if (result.isFirstTimePass) {
        addToast('Quiz Passed! 🏆', `Score: ${scorePercentage}% (+50 XP)`, 'success', 'Trophy');
        triggerConfetti();
        if (result.levelUnlocked) {
          setTimeout(() => {
            addToast(`Level ${levelId + 1} Unlocked! 🚀`, `Congratulations! You unlocked the next course level.`, 'success', 'Unlock');
          }, 1200);
        }
      } else {
        addToast('Quiz Completed', `Passed again! Score: ${scorePercentage}%`, 'info', 'CheckCircle');
      }
    } else {
      addToast('Keep Practicing!', `Score: ${scorePercentage}%. Minimum 60% required to pass.`, 'warning', 'AlertCircle');
    }
    return result;
  };

  const completeDailyChallenge = (challengeId, challengeTitle, rewardXp) => {
    const result = completeDailyChallengeAction(challengeId, challengeTitle, rewardXp);
    refreshState();
    if (result.isFirstTime) {
      addToast('Daily Challenge Completed! 🔥', `+${result.xpGained} XP awarded! Streak updated.`, 'success', 'Flame');
      triggerConfetti();
    } else {
      addToast('Challenge Completed', `Already completed today!`, 'info', 'CheckCircle');
    }
    return result;
  };

  const openAiWithPrompt = (promptText) => {
    setAiInitialPrompt(promptText);
    setIsAiOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        refreshState,
        toasts,
        addToast,
        removeToast,
        login,
        logout,
        resetAllData,
        completeLesson,
        completePractice,
        submitQuiz,
        completeDailyChallenge,
        isAiOpen,
        setIsAiOpen,
        aiInitialPrompt,
        setAiInitialPrompt,
        openAiWithPrompt
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
