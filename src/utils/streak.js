export const getWeeklyStreakCalendar = (streakCount, lastActivityDate) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday
  
  // Calculate index for today in Mon-Sun array (Mon=0..Sun=6)
  const todayIndex = (dayOfWeek + 6) % 7;

  return days.map((dayLabel, index) => {
    // If index <= todayIndex and streakCount is sufficiently active
    const isActive = index <= todayIndex && (todayIndex - index) < streakCount;
    return {
      day: dayLabel,
      isToday: index === todayIndex,
      isActive: isActive
    };
  });
};
