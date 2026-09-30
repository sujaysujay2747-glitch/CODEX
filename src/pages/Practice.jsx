import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PRACTICE_PROBLEMS } from '../data/practice';
import { Code2, CheckCircle2, Zap, Play } from 'lucide-react';

export const Practice = () => {
  const { appState } = useApp();
  const navigate = useNavigate();

  const problemsList = Object.values(PRACTICE_PROBLEMS);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <Code2 size={28} color="var(--primary)" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            Coding Practice Arena
          </h1>
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Solve hands-on practice problems in Python and C to build practical coding confidence.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {problemsList.map((problem) => {
          const isDone = appState.completedPractice?.includes(problem.id);

          return (
            <div
              key={problem.id}
              className="card card-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                background: isDone ? 'rgba(16, 185, 129, 0.03)' : '#ffffff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: isDone ? 'rgba(16, 185, 129, 0.12)' : 'var(--primary-light)',
                    color: isDone ? 'var(--accent-green)' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {isDone ? <CheckCircle2 size={24} /> : <Code2 size={24} />}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                      {problem.title}
                    </h3>
                    <span className={`pill ${problem.difficulty === 'Easy' ? 'pill-success' : 'pill-warning'}`}>
                      {problem.difficulty}
                    </span>
                    <span className="pill pill-info" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Zap size={12} fill="#0284c7" />
                      +{problem.xpReward} XP
                    </span>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    {problem.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/practice/${problem.id}`)}
                className={`btn ${isDone ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                style={{ flexShrink: 0 }}
              >
                <Play size={14} fill={isDone ? 'var(--text-dark)' : '#ffffff'} />
                <span>{isDone ? 'Review Problem' : 'Solve Challenge'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
