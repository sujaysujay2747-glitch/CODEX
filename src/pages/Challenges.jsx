import React from 'react';
import { DailyChallengeCard } from '../components/dashboard/DailyChallengeCard';
import { Flame, Zap, CheckCircle2 } from 'lucide-react';

export const Challenges = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <Flame size={28} color="#f59e0b" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            Daily Coding Challenges
          </h1>
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Complete your daily challenge to keep your streak alive and earn bonus XP!
        </p>
      </div>

      <DailyChallengeCard />

      <div className="card" style={{ marginTop: 24, padding: 24, background: 'var(--bg-main)' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={18} color="var(--primary)" />
          How Daily Challenges Work
        </h4>
        <ul style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>• A new coding challenge unlocks every 24 hours.</li>
          <li>• Completing a challenge awards +30 XP and updates your daily streak.</li>
          <li>• Solved challenges stay accessible in your learning archive.</li>
        </ul>
      </div>
    </div>
  );
};
