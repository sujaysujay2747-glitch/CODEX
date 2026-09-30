import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QUIZZES } from '../data/quizzes';
import { ArrowLeft, ArrowRight, CheckCircle2, Trophy, HelpCircle } from 'lucide-react';
import { ProgressBar } from '../components/common/ProgressBar';

export const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { submitQuiz } = useApp();

  const quiz = QUIZZES[quizId] || QUIZZES['py-quiz-1'];
  const questions = quiz.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { 0: 1, 1: 3, ... }

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    submitQuiz(quiz.id, scorePercentage, correctCount, questions.length, quiz.courseId, quiz.levelId);
    navigate(`/result/${quiz.id}`, { state: { scorePercentage, correctCount, totalQuestions: questions.length } });
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', paddingBottom: 40 }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button
          onClick={() => navigate(`/course/${quiz.courseId}/level/${quiz.levelId}`)}
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
          Exit Quiz
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="pill pill-info">{quiz.title}</span>
          <span className="pill pill-warning">+50 XP Reward</span>
        </div>
      </div>

      {/* Progress Header Card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}>
            {progressPercent}% Completed
          </span>
        </div>

        <ProgressBar progress={progressPercent} height={8} />
      </div>

      {/* Question Card */}
      <div className="card" style={{ marginBottom: 28, padding: 32 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 24, lineHeight: 1.4 }}>
          {currentIndex + 1}. {currentQuestion.question}
        </h2>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {currentQuestion.options.map((optText, optIdx) => {
            const isSelected = selectedAnswers[currentIndex] === optIdx;

            return (
              <div
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--primary-light)' : 'var(--bg-main)',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? 'var(--primary)' : 'var(--text-dark)'
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    border: isSelected ? '2px solid var(--primary)' : '2px solid #cbd5e1',
                    background: isSelected ? 'var(--primary)' : '#ffffff',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  {isSelected ? '✓' : String.fromCharCode(65 + optIdx)}
                </div>

                <span style={{ fontSize: '0.95rem' }}>{optText}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn btn-secondary btn-md"
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={!isAllAnswered}
            className="btn btn-primary btn-md"
            style={{ minWidth: 160 }}
          >
            <Trophy size={18} />
            <span>Submit Quiz</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn btn-primary btn-md"
          >
            <span>Next Question</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
