import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/courses';
import { calculateCourseProgress } from '../utils/gamification';
import { RoadmapNode } from '../components/learning/RoadmapNode';
import { ProgressBar } from '../components/common/ProgressBar';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';

export const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { appState } = useApp();

  const course = COURSES.find((c) => c.id === courseId) || COURSES[0];

  const overallProgress = calculateCourseProgress(
    course.id,
    appState.completedLessons,
    appState.passedQuizzes,
    appState.completedPractice,
    [course]
  );

  const unlockedLevels = appState.unlockedLevels?.[course.id] || [1];

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Back to Catalog */}
      <button
        onClick={() => navigate('/learn')}
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
        Back to All Courses
      </button>

      {/* Course Banner Card */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid var(--border-color)',
          marginBottom: 32,
          padding: 28
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 12,
                background: course.bgLight,
                color: course.color,
                marginBottom: 6,
                display: 'inline-block'
              }}
            >
              {course.category}
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              {course.title} Roadmap
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: course.color }}>
              {overallProgress}%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Overall Progress</div>
          </div>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.5 }}>
          {course.description}
        </p>

        <ProgressBar progress={overallProgress} height={10} variant={overallProgress === 100 ? 'success' : 'default'} />
      </div>

      {/* Roadmap Levels List */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={20} color="var(--primary)" />
          Learning Journey Path
        </h3>

        {course.levels.map((level, idx) => (
          <RoadmapNode
            key={level.id}
            course={course}
            level={level}
            isLast={idx === course.levels.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
