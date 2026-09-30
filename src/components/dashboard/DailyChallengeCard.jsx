import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DAILY_CHALLENGE } from '../../data/challenges';
import { Flame, Zap, Play, CheckCircle2 } from 'lucide-react';

export const DailyChallengeCard = () => {
  const { appState, completeDailyChallenge } = useApp();
  const isCompleted = appState.completedChallenges?.includes(DAILY_CHALLENGE.id);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleStartChallenge = () => {
    if (isCompleted) return;
    setIsSimulating(true);

    setTimeout(() => {
      completeDailyChallenge(DAILY_CHALLENGE.id, DAILY_CHALLENGE.title, DAILY_CHALLENGE.xpReward);
      setIsSimulating(false);
    }, 1000);
  };

  return (
    <div
      className="card card-hover"
      style={{
        background: isCompleted ? 'rgba(16, 185, 129, 0.04)' : '#ffffff',
        border: isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
        marginBottom: 24
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.12)',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Flame size={20} fill="#f59e0b" />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: '#d97706' }}>
              Daily Challenge
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              {DAILY_CHALLENGE.title}
            </h4>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pill pill-info">{DAILY_CHALLENGE.difficulty}</span>
          <span className="pill pill-warning" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Zap size={12} fill="#f59e0b" />
            +{DAILY_CHALLENGE.xpReward} XP
          </span>
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
        {DAILY_CHALLENGE.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {isCompleted ? (
          <button className="btn btn-secondary btn-sm" disabled style={{ color: 'var(--accent-green)', gap: 6 }}>
            <CheckCircle2 size={16} />
            <span>Challenge Completed Today (+30 XP)</span>
          </button>
        ) : (
          <button
            onClick={handleStartChallenge}
            className="btn btn-primary btn-sm"
            disabled={isSimulating}
          >
            {isSimulating ? (
              <span>Testing Solution...</span>
            ) : (
              <>
                <Play size={14} fill="#ffffff" />
                <span>Start Challenge</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
