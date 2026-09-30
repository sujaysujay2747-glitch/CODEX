import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { INITIAL_LEADERBOARD } from '../../data/leaderboard';
import { Trophy, ArrowRight, Medal } from 'lucide-react';

export const LeaderboardPreview = () => {
  const { appState } = useApp();
  const navigate = useNavigate();

  // Merge appState user XP into leaderboard list
  const currentXP = appState.xp;
  const updatedLeaderboard = INITIAL_LEADERBOARD.map((item) => {
    if (item.isCurrentUser) {
      return { ...item, xp: currentXP, name: appState.user?.name || 'Sujay' };
    }
    return item;
  })
    .sort((a, b) => b.xp - a.xp)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const topStudents = updatedLeaderboard.slice(0, 4);

  return (
    <div className="card" style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Trophy size={20} color="#f59e0b" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            Top Ranks
          </h3>
        </div>
        <button
          onClick={() => navigate('/leaderboard')}
          style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}
        >
          View Full <ArrowRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {topStudents.map((student) => {
          const isMe = student.isCurrentUser;
          return (
            <div
              key={student.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                background: isMe ? 'var(--primary-light)' : 'var(--bg-main)',
                border: isMe ? '1px solid var(--primary-border)' : '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    width: 24,
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: student.rank === 1 ? '#d97706' : student.rank === 2 ? '#64748b' : student.rank === 3 ? '#b45309' : 'var(--text-muted)',
                    textAlign: 'center'
                  }}
                >
                  #{student.rank}
                </span>

                <div
                  className="avatar-circle"
                  style={{ width: 32, height: 32, fontSize: '0.82rem', backgroundColor: student.avatarBg }}
                >
                  {student.name.charAt(0)}
                </div>

                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: isMe ? 700 : 600, color: 'var(--text-dark)' }}>
                    {student.name} {isMe && <span style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>(You)</span>}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Lvl {student.level} • {student.badgesCount} Badges
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>
                {student.xp} XP
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
