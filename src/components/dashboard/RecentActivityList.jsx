import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Award, Code2, BookOpen, Trophy, Flame, Sparkles } from 'lucide-react';

const ICON_MAP = {
  CheckCircle2,
  Award,
  Code2,
  BookOpen,
  Trophy,
  Flame,
  Sparkles
};

export const RecentActivityList = () => {
  const { appState } = useApp();
  const activities = appState.activities || [];

  return (
    <div className="card" style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkles size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            Recent Activity
          </h3>
        </div>
      </div>

      {activities.length === 0 ? (
        <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Your recent learning activity will appear here as you complete lessons, practices, and quizzes.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activities.slice(0, 5).map((act) => {
            const IconComponent = ICON_MAP[act.icon] || CheckCircle2;
            const iconColor =
              act.type === 'badge' ? '#f59e0b' :
              act.type === 'quiz' ? '#8b5cf6' :
              act.type === 'practice' ? '#10b981' : 'var(--primary)';

            return (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: `${iconColor}15`,
                    color: iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconComponent size={18} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--text-dark)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {act.text}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {act.relativeTime}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
