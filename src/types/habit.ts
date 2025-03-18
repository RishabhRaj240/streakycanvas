
export type HabitCategory = 
  | 'health'
  | 'fitness'
  | 'mindfulness'
  | 'learning'
  | 'productivity'
  | 'creativity';

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  streak: number;
  longestStreak: number;
  completedDates: string[]; // ISO date strings
  createdAt: string; // ISO date string
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string; // ISO date string
  category?: HabitCategory;
  type: 'streak' | 'completion' | 'category';
  requirement: number; // e.g., 7 for a 7-day streak
}
