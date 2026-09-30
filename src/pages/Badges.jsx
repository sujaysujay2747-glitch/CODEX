import React from 'react';
import { useApp } from '../context/AppContext';
import { BADGES } from '../data/badges';
import { BadgeItem } from '../components/common/BadgeItem';
import { Award, Sparkles } from 'lucide-react';

export const Badges = () => {
  const { appState } = useApp();
  const unlockedIds = appState.badges || ['first_step'];

  const unlockedCount = unlockedIds.length;
  const totalCount = BADGES.length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Award size={28} color="var(--primary)" />
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              Badges & Achievements
            </h1>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Earn badges by completing lessons, maintaining streaks, and conquering level quizzes.
          </p>
        </div>

        <div className="pill pill-info" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          <Sparkles size={16} color="var(--primary)" />
          <span>{unlockedCount} / {totalCount} Badges Unlocked</span>
        </div>
      </div>

      <div className="grid-3">
        {BADGES.map((badge) => {
          const isUnlocked = unlockedIds.includes(badge.id);
          return <BadgeItem key={badge.id} badge={badge} isUnlocked={isUnlocked} />;
        })}
      </div>
    </div>
  );
};
