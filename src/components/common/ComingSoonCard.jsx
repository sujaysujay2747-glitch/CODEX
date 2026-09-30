import React from 'react';
import { Sparkles, Clock } from 'lucide-react';

export const ComingSoonCard = ({ title, description, features = [], icon: IconComponent }) => {
  return (
    <div
      className="card"
      style={{
        maxWidth: 720,
        margin: '32px auto',
        padding: '48px 36px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: 'var(--primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
          color: 'var(--primary)'
        }}
      >
        {IconComponent ? <IconComponent size={36} /> : <Sparkles size={36} />}
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: 'rgba(245, 158, 11, 0.12)', color: '#d97706', fontSize: '0.82rem', fontWeight: 700, marginBottom: 16 }}>
        <Clock size={14} />
        Coming Soon in UpSkillX 2.0
      </div>

      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 12 }}>
        {title}
      </h2>

      <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto 28px auto', lineHeight: 1.6 }}>
        {description}
      </p>

      {features.length > 0 && (
        <div style={{ textAlign: 'left', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 20, maxWidth: 520, margin: '0 auto' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 12 }}>
            Upcoming Capabilities:
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {features.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', color: 'var(--text-body)' }}>
                <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
