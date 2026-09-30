import React from 'react';
import { ComingSoonCard } from '../components/common/ComingSoonCard';
import { UserCheck } from 'lucide-react';

export const Mentorship = () => {
  return (
    <ComingSoonCard
      title="1-on-1 Senior Mentorship"
      description="Mentor sessions are coming soon! Book 1-on-1 code reviews, career guidance, and mock interview practice sessions with senior engineering mentors."
      features={[
        '1-on-1 live video code reviews & architecture feedback',
        'Personalized learning roadmap reviews with industry seniors',
        'Mock technical interviews for internships and placements',
        'Direct async messaging for code assistance'
      ]}
      icon={UserCheck}
    />
  );
};
