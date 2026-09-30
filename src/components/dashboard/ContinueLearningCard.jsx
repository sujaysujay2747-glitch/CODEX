import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { COURSES } from '../../data/courses';
import { LESSONS } from '../../data/lessons';
import { calculateCourseProgress } from '../../utils/gamification';
import { ProgressBar } from '../common/ProgressBar';
import { Play, Code2, BookOpen } from 'lucide-react';

export const ContinueLearningCard = () => {
  const { appState } = useApp();
  const navigate = useNavigate();

  // Find active course (Python by default or C if further ahead)
  const pythonProgress = calculateCourseProgress('python', appState.completedLessons, appState.passedQuizzes, appState.completedPractice, COURSES);
  const activeCourseId = 'python';
  const activeCourse = COURSES.find((c) => c.id === activeCourseId);

  // Find next uncompleted lesson in Python
  const pythonLessons = Object.values(LESSONS).filter((l) => l.courseId === 'python');
  const lastCompletedLessonId = appState.completedLessons.filter((id) => id.startsWith('py-')).slice(-1)[0];
  const lastCompletedLesson = lastCompletedLessonId ? LESSONS[lastCompletedLessonId] : null;

  const nextLesson = pythonLessons.find((l) => !appState.completedLessons.includes(l.id)) || pythonLessons[0];

  const handleContinue = () => {
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
    } else {
      navigate(`/course/${activeCourseId}`);
    }
  };

  return (
    <div
      className="card card-hover"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid var(--border-color)',
        marginBottom: 24
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: activeCourse.bgLight,
              color: activeCourse.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Code2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: activeCourse.color }}>
              Continue Learning
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              {activeCourse.title} — Level 1: Basics
            </h3>
          </div>
        </div>

        <button onClick={handleContinue} className="btn btn-primary btn-md">
          <Play size={16} fill="#ffffff" />
          <span>Continue</span>
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <ProgressBar progress={pythonProgress} showText={true} height={10} variant="success" />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.86rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
          <BookOpen size={16} color="var(--primary)" />
          <span>
            {lastCompletedLesson ? (
              <>Last completed: <strong>{lastCompletedLesson.title}</strong></>
            ) : (
              'Ready to start your first lesson!'
            )}
          </span>
        </div>

        <div style={{ color: 'var(--primary)', fontWeight: 600 }}>
          Next Up: {nextLesson?.title || 'Basics'}
        </div>
      </div>
    </div>
  );
};
