import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/courses';
import { getStudentRankInfo, calculateCourseProgress } from '../utils/gamification';
import { ProgressBar } from '../components/common/ProgressBar';
import { User, LogOut, Zap, ShieldAlert, Flame, Award, RotateCcw, BookOpen } from 'lucide-react';

export const Profile = () => {
  const { appState, logout, resetAllData } = useApp();
  const navigate = useNavigate();

  const user = appState.user || { name: 'Sujay', username: 'sujay_dev', studentId: 'UX-2026-8942' };
  const rankInfo = getStudentRankInfo(appState.xp);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: 40 }}>
      {/* User Header Profile Card */}
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
          padding: 32,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            className="avatar-circle"
            style={{ width: 72, height: 72, fontSize: '1.8rem', backgroundColor: user.avatarBg || '#4f46e5' }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                {user.name}
              </h1>
              <span className="pill pill-info">{rankInfo.title}</span>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              @{user.username} • Student ID: <strong>{user.studentId || 'UX-2026-8942'}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={resetAllData} className="btn btn-secondary btn-sm" title="Restore Default Prototype Data">
            <RotateCcw size={16} />
            <span>Reset Demo Data</span>
          </button>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Gamification Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        <div className="card" style={{ textAlign: 'center', padding: 20 }}>
          <Zap size={24} color="var(--primary)" style={{ margin: '0 auto 6px auto' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>{appState.xp} XP</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Experience</div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: 20 }}>
          <ShieldAlert size={24} color="#0284c7" style={{ margin: '0 auto 6px auto' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>Level {rankInfo.level}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Global Rank</div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: 20 }}>
          <Flame size={24} color="#f59e0b" style={{ margin: '0 auto 6px auto' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>{appState.streak?.count || 7} Days</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Active Streak</div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: 20 }}>
          <Award size={24} color="var(--accent-green)" style={{ margin: '0 auto 6px auto' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>{appState.badges?.length || 1}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Badges Unlocked</div>
        </div>
      </div>

      {/* Course Progress Breakdown */}
      <div className="card" style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={20} color="var(--primary)" />
          Course Completion Overview
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {COURSES.map((course) => {
            const prog = calculateCourseProgress(
              course.id,
              appState.completedLessons,
              appState.passedQuizzes,
              appState.completedPractice,
              [course]
            );

            return (
              <div key={course.id} style={{ background: 'var(--bg-main)', padding: 18, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>{course.title}</span>
                  <span style={{ color: course.color }}>{prog}%</span>
                </div>
                <ProgressBar progress={prog} height={8} variant={prog === 100 ? 'success' : 'default'} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
