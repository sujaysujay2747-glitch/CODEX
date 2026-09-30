import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LESSONS } from '../data/lessons';
import { COURSES } from '../data/courses';
import { ArrowLeft, ArrowRight, CheckCircle2, Bot, Lightbulb, Code2, BookOpen } from 'lucide-react';
import { ProgressBar } from '../components/common/ProgressBar';

export const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { appState, completeLesson, openAiWithPrompt } = useApp();

  const lesson = LESSONS[lessonId] || LESSONS['py-1-1'];
  const course = COURSES.find((c) => c.id === lesson.courseId) || COURSES[0];

  const isCompleted = appState.completedLessons.includes(lesson.id);

  // Compute lesson sequence index
  const courseLessons = Object.values(LESSONS).filter((l) => l.courseId === lesson.courseId);
  const currentIndex = courseLessons.findIndex((l) => l.id === lesson.id);
  const totalLessonsInCourse = courseLessons.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalLessonsInCourse) * 100);

  const handleComplete = () => {
    completeLesson(lesson.id, lesson.title, lesson.courseId, lesson.levelId);
  };

  const handleNext = () => {
    if (!isCompleted) {
      completeLesson(lesson.id, lesson.title, lesson.courseId, lesson.levelId);
    }
    if (lesson.nextLessonId) {
      navigate(`/lesson/${lesson.nextLessonId}`);
    } else {
      navigate(`/course/${lesson.courseId}/level/${lesson.levelId}`);
    }
  };

  const handlePrevious = () => {
    if (lesson.prevLessonId) {
      navigate(`/lesson/${lesson.prevLessonId}`);
    } else {
      navigate(`/course/${lesson.courseId}/level/${lesson.levelId}`);
    }
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: 40 }}>
      {/* Top Breadcrumb Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button
          onClick={() => navigate(`/course/${lesson.courseId}/level/${lesson.levelId}`)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.88rem',
            fontWeight: 600,
            color: 'var(--text-muted)'
          }}
        >
          <ArrowLeft size={16} />
          Back to Level {lesson.levelId}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="pill pill-info">{course.title}</span>
          <span className="pill pill-warning">Level {lesson.levelId}</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="card" style={{ marginBottom: 28, padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            {lesson.title}
          </h1>

          {isCompleted && (
            <span className="pill pill-success" style={{ padding: '6px 12px', fontSize: '0.84rem' }}>
              ✓ Completed (+20 XP)
            </span>
          )}
        </div>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: 24 }}>
          {lesson.explanation}
        </p>

        {/* Key Concepts */}
        <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 20, marginBottom: 24 }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={18} color="var(--primary)" />
            Key Concepts
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {lesson.keyConcepts?.map((concept, idx) => (
              <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-body)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>•</span>
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Code Example Box */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Code2 size={16} /> Code Example ({course.shortName})
            </span>
            <button
              onClick={() => openAiWithPrompt(`Explain this code example in detail:\n${lesson.codeExample}`)}
              style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Bot size={14} /> Ask AI Tutor
            </button>
          </div>

          <pre
            style={{
              background: 'var(--bg-dark-editor)',
              color: '#f8fafc',
              padding: 20,
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.92rem',
              overflowX: 'auto',
              border: '1px solid #1e293b'
            }}
          >
            <code>{lesson.codeExample}</code>
          </pre>
        </div>

        {/* Expected Output */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
            Expected Output
          </div>
          <div
            style={{
              background: '#0f172a',
              color: '#38bdf8',
              padding: '12px 18px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem'
            }}
          >
            {lesson.expectedOutput}
          </div>
        </div>

        {/* Pro Tip Note */}
        {lesson.tip && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: 16,
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <Lightbulb size={20} color="#d97706" style={{ marginTop: 2, flexShrink: 0 }} />
            <div style={{ fontSize: '0.88rem', color: '#b45309', lineHeight: 1.5 }}>
              <strong>Pro Tip:</strong> {lesson.tip}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar Footer Navigation */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ProgressBar progress={progressPercent} showText={true} height={8} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={handlePrevious} className="btn btn-secondary btn-md">
            <ArrowLeft size={16} />
            <span>Previous</span>
          </button>

          {!isCompleted ? (
            <button onClick={handleComplete} className="btn btn-primary btn-md">
              <CheckCircle2 size={18} />
              <span>Complete Lesson (+20 XP)</span>
            </button>
          ) : (
            <button className="btn btn-secondary btn-md" disabled style={{ color: 'var(--accent-green)' }}>
              <CheckCircle2 size={18} />
              <span>Completed</span>
            </button>
          )}

          <button onClick={handleNext} className="btn btn-primary btn-md">
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
