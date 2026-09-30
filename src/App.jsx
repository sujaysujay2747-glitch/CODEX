import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Learn } from './pages/Learn';
import { Course } from './pages/Course';
import { Level } from './pages/Level';
import { Lesson } from './pages/Lesson';
import { Practice } from './pages/Practice';
import { PracticeDetail } from './pages/PracticeDetail';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { Challenges } from './pages/Challenges';
import { Leaderboard } from './pages/Leaderboard';
import { Badges } from './pages/Badges';
import { Teams } from './pages/Teams';
import { Mentorship } from './pages/Mentorship';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const { appState } = useApp();
  if (!appState.auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Authenticated Application Layout Routes */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/course/:courseId/level/:levelId" element={<Level />} />
            <Route path="/lesson/:lessonId" element={<Lesson />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/:problemId" element={<PracticeDetail />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/result/:quizId" element={<Result />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
