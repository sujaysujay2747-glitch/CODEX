import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Lock, ArrowRight, Play, Award } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';
import { LESSONS } from '../../data/lessons';

export const RoadmapNode = ({ course, level, isLast }) => {
  const { appState } = useApp();
  const navigate = useNavigate();

  const courseUnlocked = appState.unlockedLevels?.[course.id] || [1];
  const isUnlocked = courseUnlocked.includes(level.id);

  // Check completion logic
  const levelLessonIds = Object.keys(LESSONS).filter(
    (id) => LESSONS[id].courseId === course.id && LESSONS[id].levelId === level.id
  );
  const completedLessonsInLevel = levelLessonIds.filter((id) => appState.completedLessons.includes(id));
  const isPracticeDone = appState.completedPractice.includes(level.practiceId);
  const isQuizPassed = appState.passedQuizzes[level.quizId]?.passed;

  const totalItems = levelLessonIds.length + 2; // lessons + practice + quiz
  let doneItems = completedLessonsInLevel.length;
  if (isPracticeDone) doneItems += 1;
  if (isQuizPassed) doneItems += 1;

  const completionPercent = Math.round((doneItems / totalItems) * 100);
  const isCompleted = completionPercent === 100;

  let stateType = 'locked';
  if (isUnlocked) {
    stateType = isCompleted ? 'completed' : 'current';
  }

  const handleOpenLevel = () => {
    if (!isUnlocked) return;
    navigate(`/course/${course.id}/level/${level.id}`);
  };

  return (
    <div style={{ position: 'relative', marginBottom: isLast ? 0 : 36 }}>
      {/* Connector Line */}
      {!isLast && (
        <div
          style={{
            position: 'absolute',
            left: 28,
            top: 64,
            bottom: -36,
            width: 4,
            background: isCompleted ? 'var(--accent-green)' : isUnlocked ? 'var(--primary-border)' : '#e2e8f0',
            zIndex: 1,
            borderRadius: 2
          }}
        />
      )}

      <div
        className="card"
        style={{
          display: 'flex',
          gap: 20,
          padding: 24,
          background: stateType === 'completed' ? 'linear-gradient(135deg, #ffffff 0%, rgba(16, 185, 129, 0.04) 100%)' :
                      stateType === 'current' ? '#ffffff' : '#f8fafc',
          border: stateType === 'current' ? '2px solid var(--primary)' :
                  stateType === 'completed' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px dashed var(--border-color)',
          boxShadow: stateType === 'current' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          opacity: stateType === 'locked' ? 0.75 : 1,
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* State Node Circle */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: stateType === 'completed' ? 'var(--accent-green)' :
                        stateType === 'current' ? 'var(--primary)' : '#cbd5e1',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.2rem',
            flexShrink: 0,
            boxShadow: stateType === 'current' ? '0 4px 12px rgba(79, 70, 229, 0.3)' : 'none'
          }}
        >
          {stateType === 'completed' ? (
            <CheckCircle2 size={30} color="#ffffff" />
          ) : stateType === 'locked' ? (
            <Lock size={24} color="#ffffff" />
          ) : (
            `L${level.id}`
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                Level {level.id} — {level.title}
              </h3>
              {stateType === 'completed' && <span className="pill pill-success">✓ Completed</span>}
              {stateType === 'current' && <span className="pill pill-info">In Progress</span>}
              {stateType === 'locked' && <span className="pill" style={{ background: '#e2e8f0', color: '#64748b' }}>Locked</span>}
            </div>

            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: stateType === 'completed' ? 'var(--accent-green)' : 'var(--primary)' }}>
              {completionPercent}%
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 14 }}>
            {level.description}
          </p>

          {stateType !== 'locked' ? (
            <div>
              <ProgressBar progress={completionPercent} height={8} variant={stateType === 'completed' ? 'success' : 'default'} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {completedLessonsInLevel.length}/{levelLessonIds.length} Lessons • {isPracticeDone ? '1/1 Practice' : '0/1 Practice'} • {isQuizPassed ? '1/1 Quiz' : '0/1 Quiz'}
                </span>
                <button onClick={handleOpenLevel} className={`btn ${stateType === 'current' ? 'btn-primary' : 'btn-secondary'} btn-sm`}>
                  <span>{stateType === 'completed' ? 'Review Level' : 'Continue Level'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Lock size={14} />
              Complete Level {level.id - 1} quiz to unlock Level {level.id}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
