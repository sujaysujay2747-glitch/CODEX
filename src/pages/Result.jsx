import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QUIZZES } from '../data/quizzes';
import { COURSES } from '../data/courses';
import { Trophy, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Award, Zap, Unlock } from 'lucide-react';

export const Result = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { appState } = useApp();

  const quiz = QUIZZES[quizId] || QUIZZES['py-quiz-1'];
  const course = COURSES.find((c) => c.id === quiz.courseId) || COURSES[0];

  const stateData = location.state || {};
  const scorePercentage = stateData.scorePercentage ?? (appState.passedQuizzes[quiz.id]?.scorePercentage || 80);
  const correctCount = stateData.correctCount ?? 4;
  const totalQuestions = stateData.totalQuestions ?? 5;

  const isPassed = scorePercentage >= 60;
  const nextLevel = quiz.levelId + 1;

  return (
    <div style={{ maxWidth: 640, margin: '20px auto 40px auto' }}>
      <div
        className="card"
        style={{
          padding: '40px 32px',
          textAlign: 'center',
          background: isPassed ? 'linear-gradient(180deg, #ffffff 0%, rgba(16, 185, 129, 0.04) 100%)' : '#ffffff',
          border: isPassed ? '2px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Trophy / Status Icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: isPassed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            color: isPassed ? 'var(--accent-green)' : '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}
        >
          {isPassed ? <Trophy size={38} /> : <AlertCircle size={38} />}
        </div>

        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 8 }}>
          {isPassed ? 'Level Quiz Complete! 🎉' : 'Keep Practicing! 💪'}
        </h1>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: 28 }}>
          {isPassed
            ? `Outstanding work! You passed the ${quiz.title} evaluation.`
            : `You scored ${scorePercentage}%. A minimum score of 60% is required to pass and unlock the next level.`}
        </p>

        {/* Score Statistics Cards */}
        <div className="grid-3" style={{ marginBottom: 32 }}>
          <div style={{ background: 'var(--bg-main)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Score</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: isPassed ? 'var(--accent-green)' : '#d97706' }}>
              {scorePercentage}%
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>{correctCount}/{totalQuestions} Correct</div>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>XP Earned</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
              {isPassed ? '+50 XP' : '0 XP'}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>Quiz Reward</div>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Next Level</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: isPassed ? 'var(--accent-green)' : '#94a3b8' }}>
              {isPassed ? `Lvl ${nextLevel}` : 'Locked'}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>{isPassed ? 'Unlocked!' : 'Requires Pass'}</div>
          </div>
        </div>

        {/* Level Unlocked Banner */}
        {isPassed && nextLevel <= 4 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(79, 70, 229, 0.08)',
              border: '1px solid rgba(79, 70, 229, 0.2)',
              color: 'var(--primary)',
              fontSize: '0.92rem',
              fontWeight: 700,
              marginBottom: 28
            }}
          >
            <Unlock size={20} />
            <span>Level {nextLevel} Unlocked on {course.title} Roadmap!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <button
            onClick={() => navigate(`/quiz/${quiz.id}`)}
            className="btn btn-secondary btn-lg"
          >
            <RotateCcw size={18} />
            <span>Retry Quiz</span>
          </button>

          {isPassed ? (
            <button
              onClick={() => navigate(`/course/${quiz.courseId}`)}
              className="btn btn-primary btn-lg"
            >
              <span>Continue to Next Level</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => navigate(`/course/${quiz.courseId}/level/${quiz.levelId}`)}
              className="btn btn-primary btn-lg"
            >
              <span>Review Lessons</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
