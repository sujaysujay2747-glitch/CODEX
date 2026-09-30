import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, Zap, Flame, Bot, RotateCcw } from 'lucide-react';

export const Header = ({ onToggleMobileNav, titleBreadcrumb }) => {
  const { appState, setIsAiOpen, resetAllData } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbTitle = () => {
    if (titleBreadcrumb) return titleBreadcrumb;
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/learn') return 'Courses Roadmap';
    if (path === '/practice') return 'Coding Practice';
    if (path === '/challenges') return 'Daily Challenges';
    if (path === '/leaderboard') return 'Student Leaderboard';
    if (path === '/badges') return 'Earned Badges';
    if (path === '/teams') return 'Teams Collaboration';
    if (path === '/mentorship') return 'Mentorship Sessions';
    if (path === '/profile') return 'Student Profile';
    if (path.startsWith('/course/')) return 'Course Overview';
    if (path.startsWith('/lesson/')) return 'Lesson View';
    if (path.startsWith('/quiz/')) return 'Quiz Assessment';
    if (path.startsWith('/result/')) return 'Quiz Result';
    return 'UpSkillX';
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          onClick={onToggleMobileNav}
          className="mobile-nav-toggle"
          style={{ padding: 6, color: 'var(--text-dark)' }}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-title-breadcrumb">
          <span>UpSkillX</span>
          <span>/</span>
          <strong>{getBreadcrumbTitle()}</strong>
        </div>
      </div>

      <div className="header-right">
        {/* XP Pill */}
        <div className="pill-stat pill-xp" title="Total Experience Points">
          <Zap size={16} fill="var(--primary)" />
          <span>{appState.xp} XP</span>
        </div>

        {/* Streak Pill */}
        <div className="pill-stat pill-streak" title="Current Daily Streak">
          <Flame size={16} fill="#f59e0b" />
          <span>{appState.streak?.count || 1} Days</span>
        </div>

        {/* AI Tutor Toggle */}
        <button
          onClick={() => setIsAiOpen((prev) => !prev)}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          title="Open AI Tutor Helper"
        >
          <Bot size={16} color="var(--primary)" />
          <span style={{ display: 'none', mdDisplay: 'inline' }}>AI Tutor</span>
        </button>

        {/* Quick Demo Reset Data Button */}
        <button
          onClick={resetAllData}
          style={{ padding: 8, color: 'var(--text-muted)' }}
          title="Reset Prototype Demo Data"
          aria-label="Reset Prototype Demo Data"
        >
          <RotateCcw size={16} />
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => navigate('/profile')}
          className="user-avatar-btn"
          title="View Profile"
        >
          <div
            className="avatar-circle"
            style={{ backgroundColor: appState.user?.avatarBg || '#4f46e5' }}
          >
            {appState.user?.name ? appState.user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)', display: 'none', smDisplay: 'inline' }}>
            {appState.user?.name || 'Sujay'}
          </span>
        </button>
      </div>
    </header>
  );
};
