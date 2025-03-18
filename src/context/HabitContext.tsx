
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Habit, Badge, HabitCategory } from '@/types/habit';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { format, isSameDay, addDays, parseISO } from 'date-fns';

interface HabitContextType {
  habits: Habit[];
  badges: Badge[];
  selectedDate: Date;
  habitsByCategory: Record<HabitCategory, Habit[]>;
  addHabit: (name: string, category: HabitCategory) => void;
  toggleHabitCompletion: (habitId: string, date: Date) => void;
  deleteHabit: (habitId: string) => void;
  isHabitCompletedOnDate: (habitId: string, date: Date) => boolean;
  getCompletionRateForMonth: (habitId: string, month: Date) => number;
  setSelectedDate: (date: Date) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const STORAGE_KEY = 'streakycanvas-habits';
const BADGES_STORAGE_KEY = 'streakycanvas-badges';

// Initial badges
const defaultBadges: Badge[] = [
  {
    id: uuidv4(),
    name: 'Beginner',
    description: 'Completed your first habit',
    icon: 'award',
    unlocked: false,
    type: 'completion',
    requirement: 1
  },
  {
    id: uuidv4(),
    name: '3-Day Streak',
    description: 'Maintained a 3-day streak',
    icon: 'flame',
    unlocked: false,
    type: 'streak',
    requirement: 3
  },
  {
    id: uuidv4(),
    name: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    icon: 'trophy',
    unlocked: false,
    type: 'streak',
    requirement: 7
  },
  {
    id: uuidv4(),
    name: 'Consistency King',
    description: 'Maintained a 30-day streak',
    icon: 'crown',
    unlocked: false,
    type: 'streak',
    requirement: 30
  },
  {
    id: uuidv4(),
    name: 'Fitness Fanatic',
    description: 'Complete 10 fitness habits',
    icon: 'dumbbell',
    unlocked: false,
    category: 'fitness',
    type: 'category',
    requirement: 10
  },
  {
    id: uuidv4(),
    name: 'Mindfulness Master',
    description: 'Complete 10 mindfulness habits',
    icon: 'brain',
    unlocked: false,
    category: 'mindfulness',
    type: 'category',
    requirement: 10
  }
];

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [badges, setBadges] = useState<Badge[]>(defaultBadges);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Load saved data on initial load
  useEffect(() => {
    const savedHabits = localStorage.getItem(STORAGE_KEY);
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }

    const savedBadges = localStorage.getItem(BADGES_STORAGE_KEY);
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    } else {
      localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(defaultBadges));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(badges));
  }, [badges]);

  // Group habits by category
  const habitsByCategory = habits.reduce<Record<HabitCategory, Habit[]>>((acc, habit) => {
    if (!acc[habit.category]) {
      acc[habit.category] = [];
    }
    acc[habit.category].push(habit);
    return acc;
  }, {} as Record<HabitCategory, Habit[]>);

  // Check if a habit is completed on a specific date
  const isHabitCompletedOnDate = (habitId: string, date: Date): boolean => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return false;
    
    return habit.completedDates.some(completedDate => {
      return isSameDay(parseISO(completedDate), date);
    });
  };

  // Calculate completion rate for a month
  const getCompletionRateForMonth = (habitId: string, month: Date): number => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return 0;
    
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    
    // Count days from habit creation to end of month or today (whichever is earlier)
    const habitCreation = parseISO(habit.createdAt);
    const startDate = habitCreation > startOfMonth ? habitCreation : startOfMonth;
    const endDate = new Date() < endOfMonth ? new Date() : endOfMonth;
    
    let totalDays = 0;
    let currentDate = startDate;
    
    while (currentDate <= endDate) {
      totalDays++;
      currentDate = addDays(currentDate, 1);
    }
    
    if (totalDays === 0) return 0;
    
    // Count completed days in the month
    const completedDaysInMonth = habit.completedDates.filter(date => {
      const completedDate = parseISO(date);
      return completedDate >= startDate && completedDate <= endDate;
    }).length;
    
    return (completedDaysInMonth / totalDays) * 100;
  };

  // Check for badges to unlock
  const checkAndUpdateBadges = (updatedHabits: Habit[]) => {
    let updatedBadges = [...badges];
    let newUnlocks = false;

    // Check streak badges
    updatedHabits.forEach(habit => {
      updatedBadges = updatedBadges.map(badge => {
        if (badge.type === 'streak' && !badge.unlocked && habit.streak >= badge.requirement) {
          newUnlocks = true;
          return { ...badge, unlocked: true, unlockedAt: new Date().toISOString() };
        }
        return badge;
      });
    });

    // Check completion badges
    const totalCompletions = updatedHabits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
    updatedBadges = updatedBadges.map(badge => {
      if (badge.type === 'completion' && !badge.unlocked && totalCompletions >= badge.requirement) {
        newUnlocks = true;
        return { ...badge, unlocked: true, unlockedAt: new Date().toISOString() };
      }
      return badge;
    });

    // Check category badges
    const categoryCounts: Record<HabitCategory, number> = {} as Record<HabitCategory, number>;
    updatedHabits.forEach(habit => {
      habit.completedDates.forEach(date => {
        categoryCounts[habit.category] = (categoryCounts[habit.category] || 0) + 1;
      });
    });

    updatedBadges = updatedBadges.map(badge => {
      if (badge.type === 'category' && badge.category && !badge.unlocked) {
        const count = categoryCounts[badge.category] || 0;
        if (count >= badge.requirement) {
          newUnlocks = true;
          return { ...badge, unlocked: true, unlockedAt: new Date().toISOString() };
        }
      }
      return badge;
    });

    if (newUnlocks) {
      setBadges(updatedBadges);
      toast({
        title: "New Badge Unlocked!",
        description: "Check your achievements to see your new badges.",
        variant: "default",
      });
    }
  };

  // Add a new habit
  const addHabit = (name: string, category: HabitCategory) => {
    const newHabit: Habit = {
      id: uuidv4(),
      name,
      category,
      streak: 0,
      longestStreak: 0,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };
    
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    
    toast({
      title: "Habit Created",
      description: `${name} has been added to your habits.`,
    });
  };

  // Toggle habit completion for a specific date
  const toggleHabitCompletion = (habitId: string, date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    setHabits(currentHabits => {
      const updatedHabits = currentHabits.map(habit => {
        if (habit.id !== habitId) return habit;
        
        const isCompleted = habit.completedDates.includes(dateString);
        let updatedCompletedDates: string[];
        let updatedStreak: number;
        
        if (isCompleted) {
          // Uncomplete the habit
          updatedCompletedDates = habit.completedDates.filter(d => d !== dateString);
          
          // Recalculate streak
          if (isSameDay(date, new Date())) {
            updatedStreak = 0;
          } else {
            // If it's a past date, recalculate the current streak
            updatedStreak = habit.streak;
          }
        } else {
          // Complete the habit
          updatedCompletedDates = [...habit.completedDates, dateString].sort();
          
          // Update streak if it's today's date
          if (isSameDay(date, new Date())) {
            const yesterday = addDays(new Date(), -1);
            const wasCompletedYesterday = habit.completedDates.some(d => 
              isSameDay(parseISO(d), yesterday)
            );
            
            updatedStreak = wasCompletedYesterday ? habit.streak + 1 : 1;
          } else {
            // If it's not today, don't change the streak
            updatedStreak = habit.streak;
          }
        }
        
        return {
          ...habit,
          completedDates: updatedCompletedDates,
          streak: updatedStreak,
          longestStreak: Math.max(updatedStreak, habit.longestStreak)
        };
      });
      
      checkAndUpdateBadges(updatedHabits);
      return updatedHabits;
    });
  };

  // Delete a habit
  const deleteHabit = (habitId: string) => {
    const habitToDelete = habits.find(h => h.id === habitId);
    if (!habitToDelete) return;
    
    setHabits(currentHabits => currentHabits.filter(h => h.id !== habitId));
    
    toast({
      title: "Habit Deleted",
      description: `${habitToDelete.name} has been removed.`,
    });
  };

  const value = {
    habits,
    badges,
    selectedDate,
    habitsByCategory,
    addHabit,
    toggleHabitCompletion,
    deleteHabit,
    isHabitCompletedOnDate,
    getCompletionRateForMonth,
    setSelectedDate
  };

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
