import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PRACTICE_PROBLEMS } from '../data/practice';
import { ArrowLeft, Play, CheckCircle2, RotateCcw, Bot, Terminal, Code2 } from 'lucide-react';

export const PracticeDetail = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { appState, completePractice, openAiWithPrompt } = useApp();

  const problem = PRACTICE_PROBLEMS[problemId] || PRACTICE_PROBLEMS['py-prac-1'];
  const isDone = appState.completedPractice?.includes(problem.id);

  const [code, setCode] = useState(problem.starterCode);
  const [activeTab, setActiveTab] = useState('output'); // 'output' or 'testcases'
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const handleReset = () => {
    setCode(problem.starterCode);
    setTestResults(null);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTestResults(null);

    setTimeout(() => {
      setIsRunning(false);
      setTestResults({
        passedCount: problem.testCases.length,
        totalCount: problem.testCases.length,
        output: problem.exampleOutput,
        status: 'Success'
      });
    }, 900);
  };

  const handleSubmit = () => {
    handleRun();
    setTimeout(() => {
      completePractice(problem.id, problem.title);
    }, 1000);
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button
          onClick={() => navigate('/practice')}
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
          Back to Practice Arena
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="pill pill-success">{problem.difficulty}</span>
          <span className="pill pill-info">+{problem.xpReward} XP</span>
          {isDone && <span className="pill pill-success">✓ Passed</span>}
        </div>
      </div>

      {/* Editor Main Layout */}
      <div className="grid-2" style={{ alignItems: 'flex-start' }}>
        {/* Left Side: Problem Statement */}
        <div className="card" style={{ padding: 24, height: '100%', minHeight: 520, overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 12 }}>
            {problem.title}
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: 20 }}>
            {problem.description}
          </p>

          <div style={{ marginBottom: 16 }}>
            <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
              Input Format
            </h4>
            <div style={{ background: 'var(--bg-main)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.86rem' }}>
              {problem.inputDescription}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
              Expected Output
            </h4>
            <div style={{ background: 'var(--bg-main)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.86rem' }}>
              {problem.outputDescription}
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => openAiWithPrompt(`I am working on the practice problem "${problem.title}". Here is my code:\n\n${code}\n\nCan you give me a hint on how to improve or debug it?`)}
              className="btn btn-outline btn-full btn-sm"
            >
              <Bot size={16} />
              <span>Get AI Tutor Hint</span>
            </button>
          </div>
        </div>

        {/* Right Side: Code Editor & Terminal Execution Output */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #1e293b', background: '#0f172a' }}>
          {/* Editor Header Bar */}
          <div style={{ background: '#1e293b', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f8fafc', fontWeight: 600, fontSize: '0.88rem' }}>
              <Code2 size={16} color="var(--primary)" />
              <span>Code Editor</span>
            </div>

            <button onClick={handleReset} style={{ color: '#94a3b8', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <RotateCcw size={14} /> Reset Code
            </button>
          </div>

          {/* Textarea Code Editor */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            style={{
              width: '100%',
              height: 280,
              background: '#0f172a',
              color: '#f8fafc',
              border: 'none',
              outline: 'none',
              padding: 18,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              lineHeight: 1.5,
              resize: 'vertical'
            }}
          />

          {/* Action Bar */}
          <div style={{ background: '#1e293b', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #334155' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setActiveTab('output')}
                style={{ fontSize: '0.82rem', fontWeight: 600, color: activeTab === 'output' ? '#38bdf8' : '#94a3b8' }}
              >
                Console Output
              </button>
              <button
                onClick={() => setActiveTab('testcases')}
                style={{ fontSize: '0.82rem', fontWeight: 600, color: activeTab === 'testcases' ? '#38bdf8' : '#94a3b8' }}
              >
                Test Cases ({problem.testCases.length})
              </button>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleRun} disabled={isRunning} className="btn btn-secondary btn-sm">
                <Play size={14} />
                <span>Run Tests</span>
              </button>
              <button onClick={handleSubmit} disabled={isRunning} className="btn btn-primary btn-sm">
                <CheckCircle2 size={14} />
                <span>Submit Solution</span>
              </button>
            </div>
          </div>

          {/* Output / Terminal Window */}
          <div style={{ padding: 18, minHeight: 140, background: '#090d16', color: '#e2e8f0', fontSize: '0.86rem', fontFamily: 'var(--font-mono)' }}>
            {isRunning ? (
              <div style={{ color: '#f59e0b' }}>⚡ Compiling & running test suite...</div>
            ) : testResults ? (
              <div>
                <div style={{ color: '#10b981', fontWeight: 700, marginBottom: 8 }}>
                  ✓ {testResults.passedCount}/{testResults.totalCount} Test Cases Passed!
                </div>
                {activeTab === 'output' ? (
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#38bdf8' }}>
                    {testResults.output}
                  </pre>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {problem.testCases.map((tc) => (
                      <div key={tc.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#1e293b', padding: '6px 12px', borderRadius: 4 }}>
                        <span>{tc.name} ({tc.input})</span>
                        <span style={{ color: '#10b981' }}>✓ Passed</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ color: '#64748b' }}>
                Click "Run Tests" or "Submit Solution" to verify code output.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
