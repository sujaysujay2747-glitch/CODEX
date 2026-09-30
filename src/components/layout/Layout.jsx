import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toast } from '../common/Toast';
import { AIHelper } from '../common/AIHelper';
import { LayoutDashboard, BookOpen, Code2, Flame, Trophy } from 'lucide-react';

export const Layout = ({ customBreadcrumb }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  const isFullWidthPage = location.pathname.startsWith('/lesson/') || location.pathname.startsWith('/practice/');

  return (
    <div className="app-layout">
      {/* Sidebar for Desktop & Mobile Overlay */}
      <Sidebar isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Main Content Area */}
      <div className="main-wrapper" style={{ marginLeft: 'var(--sidebar-width)' }}>
        <Header
          onToggleMobileNav={() => setMobileNavOpen((prev) => !prev)}
          titleBreadcrumb={customBreadcrumb}
        />

        <main className="content-body" style={{ maxWidth: isFullWidthPage ? '100%' : '1280px' }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Quick Navigation */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Navigation">
        <NavLink to="/dashboard" className={({ isActive }) => `mobile-bottom-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/learn" className={({ isActive }) => `mobile-bottom-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>Learn</span>
        </NavLink>
        <NavLink to="/practice" className={({ isActive }) => `mobile-bottom-link ${isActive ? 'active' : ''}`}>
          <Code2 size={20} />
          <span>Practice</span>
        </NavLink>
        <NavLink to="/challenges" className={({ isActive }) => `mobile-bottom-link ${isActive ? 'active' : ''}`}>
          <Flame size={20} />
          <span>Challenges</span>
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => `mobile-bottom-link ${isActive ? 'active' : ''}`}>
          <Trophy size={20} />
          <span>Ranks</span>
        </NavLink>
      </nav>

      {/* Global Toast Component */}
      <Toast />

      {/* Integrated AI Tutor Helper Drawer */}
      <AIHelper />
    </div>
  );
};
