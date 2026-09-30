import React from 'react';
import { ComingSoonCard } from '../components/common/ComingSoonCard';
import { Users } from 'lucide-react';

export const Teams = () => {
  return (
    <ComingSoonCard
      title="Team Learning & Hackathons"
      description="Team collaboration is coming soon to UpSkillX! Form study squads with college classmates, complete group coding quests, and compete on team leaderboards."
      features={[
        'Create & join study squads with up to 5 classmates',
        'Cooperative XP multipliers & group streak bonuses',
        'Team vs Team weekend coding sprint challenges',
        'Shared code review workspace and activity feeds'
      ]}
      icon={Users}
    />
  );
};
