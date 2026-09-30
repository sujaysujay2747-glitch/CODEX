import React from 'react';
import { useApp } from '../../context/AppContext';
import { getStudentRankInfo } from '../../utils/gamification';
import { Zap, ShieldAlert, Flame, Award } from 'lucide-react';

export const GamificationSummary = () => {
  const { appState } = useApp();
  const rankInfo = getStudentRankInfo(appState.xp);

  const statCards = [
    {
      title: 'Total XP',
      value: `${appState.xp} XP`,
      subtitle: `${rankInfo.xpNeeded} XP to next rank`,
      icon: Zap,
      color: '#4f46e5',
      bgColor: 'rgba(79, 70, 229, 0.1)'
    },
    {
      title: 'Student Level',
      value: `Level ${rankInfo.level}`,
      subtitle: rankInfo.title,
      icon: ShieldAlert,
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.1)'
    },
    {
      title: 'Learning Streak',
      value: `🔥 ${appState.streak?.count || 7} Days`,
      subtitle: 'Keep it going today!',
      icon: Flame,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      title: 'Badges Earned',
      value: `${appState.badges?.length || 1} Badges`,
      subtitle: 'Unlock more in courses',
      icon: Award,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    }
  ];

  return (
    <div className="grid-4" style={{ marginBottom: 28 }}>
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="card card-hover" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-md)',
                backgroundColor: card.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: card.color,
                flexShrink: 0
              }}
            >
              <Icon size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {card.title}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', margin: '2px 0' }}>
                {card.value}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-light)', fontWeight: 500 }}>
                {card.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
