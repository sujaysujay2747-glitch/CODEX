import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Zap, LogIn, Lock, User, Sparkles } from 'lucide-react';

export const Login = () => {
  const { appState, login } = useApp();
  const navigate = useNavigate();

  const [username, setUsername] = useState('sujay_dev');
  const [password, setPassword] = useState('password123');
  const [studentId, setStudentId] = useState('UX-2026-8942');

  if (appState.auth?.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username, studentId);
    navigate('/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: 440,
          width: '100%',
          padding: '40px 36px',
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary) 0%, #6366f1 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
            }}
          >
            <Zap size={32} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            UpSkillX
          </h1>
          <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Learn. Practice. Level Up.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>
              Student ID / Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-muted)' }} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Student ID or Username"
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-muted)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span>Prototype mode: any login accepted</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Demo Account</span>
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-full" style={{ marginTop: 8 }}>
            <LogIn size={18} />
            <span>Login to Dashboard</span>
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-light)' }}>
          UpSkillX Gamified College Learning Platform © 2026
        </div>
      </div>
    </div>
  );
};
