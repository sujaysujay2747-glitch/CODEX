import React from 'react';

export const ProgressBar = ({ progress = 0, variant = 'default', height = 8, showText = false }) => {
  const percentage = Math.min(100, Math.max(0, Math.round(progress)));
  
  return (
    <div style={{ width: '100%' }}>
      {showText && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="progress-bar-container" style={{ height: `${height}px` }}>
        <div
          className={`progress-bar-fill ${variant === 'success' ? 'progress-bar-success' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
