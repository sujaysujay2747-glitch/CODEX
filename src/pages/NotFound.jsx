import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, LayoutDashboard } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      style={{
        maxWidth: 520,
        margin: '60px auto',
        padding: '48px 32px',
        textAlign: 'center',
        background: '#ffffff'
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(79, 70, 229, 0.1)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}
      >
        <HelpCircle size={36} />
      </div>

      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 8 }}>
        404 — Page Not Found
      </h1>

      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: 24 }}>
        The page or learning route you are looking for does not exist or has been moved.
      </p>

      <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-lg">
        <LayoutDashboard size={18} />
        <span>Back to Dashboard</span>
      </button>
    </div>
  );
};
