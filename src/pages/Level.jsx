import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/courses';
import { LESSONS } from '../data/lessons';
import { PRACTICE_PROBLEMS } from '../data/practice';
import { QUIZZES } from '../data/quizzes';
import { ProgressBar } from '../components/common/ProgressBar';
import { ArrowLeft, CheckCircle2, Circle, BookOpen, Code2, Trophy, Lock, Play } from 'lucide-react';

export const Level = () => {
  const { courseId, levelId } = useParams();
  const navigate = useNavigate();
  const { appState } = useApp();

  const numLevelId = parseInt(levelId, 10);
  const course = COURSES.find((c) => c.id === courseId) || COURSES[0];
  const level = course.levels.find((l) => l.id === numLevelId) || course.levels[0];

  const unlockedLevels = appState.unlockedLevels?.[course.id] || [1];
  const isUnlocked = unlockedLevels.includes(numLevelId);

  // If locked, return locked warning screen
  if (!isUnlocked) {
    return (
      <div className="card" style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center', padding: 40 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#64748b' }}>
          <Lock size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 8 }}>
          Level {numLevelId} is Locked
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
          Complete Level {numLevelId - 1} and pass its evaluation quiz to unlock this content.
        </p>
        <button onClick={() => navigate(`/course/${courseId}`)} className="btn btn-primary">
          Return to Roadmap
        </button>
      </div>
    );
  }

  // Get lessons in level
  const levelLessons = Object.values(LESSONS).filter(
    (l) => l.courseId === courseId && l.levelId === numLevelId
  );

  const practice = PRACTICE_PROBLEMS[level.practiceId];
  const quiz = QUIZZES[level.quizId];

  // Calculate level progress
  const completedLessons = levelLessons.filter((l) => appState.completedLessons.includes(l.id));
  const isPracticeDone = appState.completedPractice.includes(level.practiceId);
  const quizState = appState.passedQuizzes[level.quizId];
  const isQuizPassed = quizState?.passed;

  const totalItems = levelLessons.length + 2;
  let doneCount = completedLessons.length;
  if (isPracticeDone) doneCount += 1;
  if (isQuizPassed) doneCount += 1;
  const progressPercent = Math.round((doneCount / totalItems) * 100);

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Back link */}
      <button
        onClick={() => navigate(`/course/${courseId}`)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.88rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          marginBottom: 16
        }}
      >
        <ArrowLeft size={16} />
        Back to {course.title} Roadmap
      </button>

      {/* Header Banner */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: course.color }}>
              {course.title} — Level {numLevelId}
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              {level.title}
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
              {progressPercent}%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Level Progress</div>
          </div>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          {level.description}
        </p>

        <ProgressBar progress={progressPercent} height={10} variant={progressPercent === 100 ? 'success' : 'default'} />
      </div>

      {/* Lessons List Section */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={20} color="var(--primary)" />
          Lessons ({completedLessons.length}/{levelLessons.length} Completed)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {levelLessons.map((lesson, index) => {
            const isCompleted = appState.completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: isCompleted ? 'rgba(16, 185, 129, 0.04)' : 'var(--bg-main)',
                  border: isCompleted ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {isCompleted ? (
                    <CheckCircle2 size={22} color="var(--accent-green)" />
                  ) : (
                    <Circle size={22} color="#cbd5e1" />
                  )}
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                      {index + 1}. {lesson.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {lesson.subtitle}
                    </div>
                  </div>
                </div>

                <button className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} btn-sm`}>
                  <span>{isCompleted ? 'Review' : 'Start Lesson'}</span>
                  <Play size={12} fill={isCompleted ? 'var(--text-dark)' : '#ffffff'} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practice & Quiz Row */}
      <div className="grid-2">
        {/* Practice Item */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: 8, borderRadius: 'var(--radius-sm)', color: 'var(--accent-green)' }}>
                <Code2 size={20} />
              </div>
              <div>
                <span className="pill pill-success">Coding Practice</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: 2 }}>
                  {practice?.title || 'Level Practice'}
                </h4>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              {practice?.description || 'Solve practical coding challenges to solidify concepts.'}
            </p>
          </div>

          <button
            onClick={() => navigate(`/practice/${practice.id}`)}
            className={`btn ${isPracticeDone ? 'btn-secondary' : 'btn-primary'} btn-full`}
          >
            <Code2 size={16} />
            <span>{isPracticeDone ? 'Practice Again (Passed)' : 'Start Practice (+10 XP)'}</span>
          </button>
        </div>

        {/* Quiz Item */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: 8, borderRadius: 'var(--radius-sm)', color: 'var(--accent-purple)' }}>
                <Trophy size={20} />
              </div>
              <div>
                <span className="pill pill-info">Level Evaluation</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: 2 }}>
                  {quiz?.title || 'Level Quiz'}
                </h4>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              Pass this 5-question quiz with 60%+ to earn +50 XP and unlock the next level.
            </p>
          </div>

          <button
            onClick={() => navigate(`/quiz/${quiz.id}`)}
            className={`btn ${isQuizPassed ? 'btn-secondary' : 'btn-primary'} btn-full`}
          >
            <Trophy size={16} />
            <span>{isQuizPassed ? `Quiz Passed (${quizState.scorePercentage}%)` : 'Take Level Quiz (+50 XP)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
