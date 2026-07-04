import { safeGetItem, safeSetItem, safeRemoveItem } from "./storage";
export interface StreakData {
  currentStreak: number;
  highestStreak: number;
  lastCompletedDate: string;
}

export const getLocalDateString = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
};

export const getStreakData = (): StreakData => {
  const stored = safeGetItem('pl_quiz_streak');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        return {
          currentStreak: parsed.currentStreak || 0,
          highestStreak: parsed.highestStreak || 0,
          lastCompletedDate: parsed.lastCompletedDate || '',
        };
      }
    } catch (e) {
      console.error("Failed to parse streak from localStorage", e);
    }
  }
  return {
    currentStreak: 0,
    highestStreak: 0,
    lastCompletedDate: '',
  };
};

export const recordQuizCompletion = (): StreakData => {
  const today = getLocalDateString(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getLocalDateString(yesterdayDate);

  const currentData = getStreakData();
  let { currentStreak, highestStreak, lastCompletedDate } = currentData;

  if (lastCompletedDate === '') {
    // First time completing a quiz
    currentStreak = 1;
  } else if (lastCompletedDate === yesterday) {
    // Completed yesterday, increment streak
    currentStreak += 1;
  } else if (lastCompletedDate === today) {
    // Already completed today, keep current streak
  } else {
    // Streak broken, reset to 1
    currentStreak = 1;
  }

  lastCompletedDate = today;
  if (currentStreak > highestStreak) {
    highestStreak = currentStreak;
  }

  const updatedData: StreakData = {
    currentStreak,
    highestStreak,
    lastCompletedDate,
  };

  safeSetItem('pl_quiz_streak', JSON.stringify(updatedData));
  return updatedData;
};

export const checkStreakValidity = (): StreakData => {
  const today = getLocalDateString(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getLocalDateString(yesterdayDate);

  const currentData = getStreakData();
  let { currentStreak, highestStreak, lastCompletedDate } = currentData;

  // If they have completed at least one quiz, and the last completed date is neither today nor yesterday
  if (lastCompletedDate !== '' && lastCompletedDate !== today && lastCompletedDate !== yesterday) {
    currentStreak = 0;
    const updatedData: StreakData = {
      currentStreak,
      highestStreak,
      lastCompletedDate,
    };
    safeSetItem('pl_quiz_streak', JSON.stringify(updatedData));
    return updatedData;
  }
  return currentData;
};
