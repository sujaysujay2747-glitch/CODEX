import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { calculateCourseProgress } from '../../utils/gamification';
import { ProgressBar } from '../common/ProgressBar';
import { Code2, Cpu, ArrowRight, BookOpen } from 'lucide-react';

const ICON_MAP = {
  Code2,
  Cpu
};

export const CourseCard = ({ course }) => {
  const { appState } = useApp();
  const navigate = useNavigate();
  const IconComponent = ICON_MAP[course.iconName] || Code2;

  const progress = calculateCourseProgress(
    course.id,
    appState.completedLessons,
    appState.passedQuizzes,
    appState.completedPractice,
    [course]
  );

  const unlockedLevels = appState.unlockedLevels?.[course.id] || [1];
  const maxUnlockedLevel = Math.max(...unlockedLevels);

  return (
    <div
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        transition: 'all 0.25s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 'var(--radius-md)',
            background: course.bgLight,
            color: course.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconComponent size={28} />
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 12,
            background: course.bgLight,
            color: course.color
          }}
        >
          {course.category}
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 8 }}>
        {course.title}
      </h3>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 20, flex: 1, lineHeight: 1.5 }}>
        {course.description}
      </p>

      <div style={{ marginBottom: 16 }}>
        <ProgressBar progress={progress} showText={true} variant={progress === 100 ? 'success' : 'default'} />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid var(--border-subtle)',
          marginTop: 'auto'
        }}
      >
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Level {maxUnlockedLevel} of {course.totalLevels}
        </div>

        <button
          onClick={() => navigate(`/course/${course.id}`)}
          className="btn btn-primary btn-sm"
        >
          <span>{progress > 0 ? 'Continue' : 'Start Course'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
