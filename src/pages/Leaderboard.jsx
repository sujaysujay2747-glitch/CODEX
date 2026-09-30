import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_LEADERBOARD } from '../data/leaderboard';
import { Trophy, Search, Flame, Award, ShieldAlert } from 'lucide-react';

export const Leaderboard = () => {
  const { appState } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Update current user XP in leaderboard
  const currentXP = appState.xp;
  const leaderboardList = INITIAL_LEADERBOARD.map((item) => {
    if (item.isCurrentUser) {
      return {
        ...item,
        xp: currentXP,
        name: appState.user?.name || 'Sujay',
        badgesCount: appState.badges?.length || 3
      };
    }
    return item;
  })
    .sort((a, b) => b.xp - a.xp)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const filteredList = leaderboardList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Trophy size={28} color="#f59e0b" />
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              Student Leaderboard
            </h1>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            See how you rank among your peers on UpSkillX!
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: 260 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <th style={{ padding: '16px 20px', width: 80 }}>Rank</th>
              <th style={{ padding: '16px 20px' }}>Student</th>
              <th style={{ padding: '16px 20px' }}>Level</th>
              <th style={{ padding: '16px 20px' }}>Badges</th>
              <th style={{ padding: '16px 20px' }}>Streak</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Total XP</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((student) => {
              const isMe = student.isCurrentUser;

              return (
                <tr
                  key={student.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    background: isMe ? 'var(--primary-light)' : '#ffffff',
                    fontWeight: isMe ? 700 : 400
                  }}
                >
                  <td style={{ padding: '16px 20px', fontWeight: 800, color: student.rank === 1 ? '#d97706' : student.rank === 2 ? '#64748b' : student.rank === 3 ? '#b45309' : 'var(--text-muted)' }}>
                    #{student.rank}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="avatar-circle" style={{ width: 36, height: 36, backgroundColor: student.avatarBg }}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-dark)', fontWeight: isMe ? 800 : 600 }}>
                          {student.name} {isMe && <span style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 700 }}>(You)</span>}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>@{student.username}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-dark)' }}>
                    <span className="pill pill-info">Lvl {student.level}</span>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Award size={16} color="var(--primary)" />
                      <span>{student.badgesCount}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#d97706' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Flame size={16} fill="#f59e0b" />
                      <span>{student.streak} days</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right', fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                    {student.xp} XP
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
