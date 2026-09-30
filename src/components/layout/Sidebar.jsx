import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Flame,
  Trophy,
  Award,
  Users,
  UserCheck,
  User,
  Zap,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const mainNav = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/practice', label: 'Practice', icon: Code2 },
    { path: '/challenges', label: 'Challenges', icon: Flame },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/badges', label: 'Badges', icon: Award }
  ];

  const comingSoonNav = [
    { path: '/teams', label: 'Teams', icon: Users },
    { path: '/mentorship', label: 'Mentorship', icon: UserCheck }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-logo-container">
        <NavLink to="/dashboard" className="brand-logo" onClick={onClose}>
          <div className="logo-icon-box">
            <Zap size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-name">UpSkillX</span>
            <span className="brand-tagline">Learn. Practice. Level Up.</span>
          </div>
        </NavLink>

        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{ marginLeft: 'auto', display: 'none', color: 'var(--text-muted)' }}
            className="mobile-nav-toggle"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav Menu Links */}
      <div className="sidebar-nav">
        <div className="nav-section-title">Core Journey</div>
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="nav-link-left">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            </NavLink>
          );
        })}

        <div className="nav-section-title" style={{ marginTop: 16 }}>
          Collaboration
        </div>
        {comingSoonNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="nav-link-left">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              <span className="badge-coming-soon">Soon</span>
            </NavLink>
          );
        })}

        <div className="nav-section-title" style={{ marginTop: 16 }}>
          Account
        </div>
        <NavLink
          to="/profile"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <div className="nav-link-left">
            <User size={18} />
            <span>Profile</span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
