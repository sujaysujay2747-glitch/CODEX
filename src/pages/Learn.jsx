import React from 'react';
import { COURSES } from '../data/courses';
import { CourseCard } from '../components/learning/CourseCard';
import { BookOpen } from 'lucide-react';

export const Learn = () => {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <BookOpen size={28} color="var(--primary)" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            Course Catalog
          </h1>
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Master programming fundamentals step-by-step through interactive lessons, practice problems, and level quizzes.
        </p>
      </div>

      <div className="grid-2">
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
