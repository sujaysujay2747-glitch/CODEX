import React from 'react';
import { useApp } from '../context/AppContext';
import { GamificationSummary } from '../components/dashboard/GamificationSummary';
import { ContinueLearningCard } from '../components/dashboard/ContinueLearningCard';
import { DailyChallengeCard } from '../components/dashboard/DailyChallengeCard';
import { LeaderboardPreview } from '../components/dashboard/LeaderboardPreview';
import { RecentActivityList } from '../components/dashboard/RecentActivityList';

export const Dashboard = () => {
  const { appState } = useApp();
  const studentName = appState.user?.name || 'Sujay';

  return (
    <div>
      {/* Welcome Greeting */}
      <div className="dashboard-hero">
        <h1 className="greeting-text">
          Welcome back, {studentName} 👋
        </h1>
        <p className="subtitle-text">
          Track your progress, take daily challenges, and level up your programming skills!
        </p>
      </div>

      {/* 4 Gamification Summary Cards */}
      <GamificationSummary />

      {/* Main Grid Layout */}
      <div className="grid-3">
        {/* Left Column (2 spans) */}
        <div style={{ gridColumn: 'span 2' }}>
          <ContinueLearningCard />
          <DailyChallengeCard />
        </div>

        {/* Right Column (1 span) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <LeaderboardPreview />
          <RecentActivityList />
        </div>
      </div>
    </div>
  );
};
