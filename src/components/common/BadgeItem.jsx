import React from 'react';
import { Footprints, Code2, Cpu, Flame, CheckCircle2, Award, Lock } from 'lucide-react';

const BADGE_ICONS = {
  Footprints,
  Code2,
  Cpu,
  Flame,
  CheckCircle2,
  Award
};

export const BadgeItem = ({ badge, isUnlocked }) => {
  const IconComponent = BADGE_ICONS[badge.icon] || Award;

  return (
    <div
      className={`card ${isUnlocked ? 'card-hover' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '24px 20px',
        opacity: isUnlocked ? 1 : 0.65,
        background: isUnlocked ? '#ffffff' : '#f8fafc',
        border: isUnlocked ? `2px solid ${badge.color || 'var(--primary)'}` : '1px dashed var(--border-color)',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: isUnlocked ? badge.bgColor : '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
          position: 'relative'
        }}
      >
        <IconComponent size={32} color={isUnlocked ? badge.color : '#94a3b8'} />
        {!isUnlocked && (
          <div
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              background: '#64748b',
              width: 22,
              height: 22,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Lock size={12} />
          </div>
        )}
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4, color: isUnlocked ? 'var(--text-dark)' : 'var(--text-muted)' }}>
        {badge.name}
      </h3>

      <span
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          padding: '2px 8px',
          borderRadius: 12,
          background: isUnlocked ? badge.bgColor : '#e2e8f0',
          color: isUnlocked ? badge.color : '#64748b',
          marginBottom: 10
        }}
      >
        {badge.category}
      </span>

      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: 12, flex: 1 }}>
        {badge.description}
      </p>

      <div style={{ fontSize: '0.78rem', color: isUnlocked ? 'var(--accent-green)' : '#94a3b8', fontWeight: 600 }}>
        {isUnlocked ? '✓ Unlocked' : `Requirement: ${badge.condition}`}
      </div>
    </div>
  );
};
