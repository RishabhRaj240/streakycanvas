
import React, { useState } from 'react';
import { useHabits } from '@/context/HabitContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, getDaysInMonth, getDay, startOfMonth, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MonthView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const { habits, habitsByCategory } = useHabits();

  // Handlers for month navigation
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
  };

  // Get the selected habit's completed dates
  const selectedHabit = habits.find(habit => habit.id === selectedHabitId);
  const completedDates = selectedHabit?.completedDates || [];

  // Generate calendar for the month
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getDay(startOfMonth(currentMonth));
    const days = [];

    // Generate empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Generate cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = isSameDay(date, new Date());
      
      // Check if this date is completed for the selected habit
      const isCompleted = selectedHabit ? completedDates.some(completedDate => 
        isSameDay(parseISO(completedDate), date)
      ) : false;

      days.push(
        <div
          key={`day-${day}`}
          className={cn(
            "h-10 w-10 flex items-center justify-center rounded-full",
            isToday && "border border-habit-purple",
            isCompleted && "bg-habit-purple text-white",
            !isCompleted && "text-foreground"
          )}
        >
          {isCompleted ? (
            <Check className="h-4 w-4" />
          ) : (
            <span>{day}</span>
          )}
        </div>
      );
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-lg font-medium">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          {!isSameMonth(currentMonth, new Date()) && (
            <Button variant="ghost" onClick={goToCurrentMonth}>
              Current Month
            </Button>
          )}
        </div>
        
        <Select
          value={selectedHabitId || ''}
          onValueChange={(value) => setSelectedHabitId(value)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select a habit" />
          </SelectTrigger>
          <SelectContent>
            {habits.map((habit) => (
              <SelectItem key={habit.id} value={habit.id}>{habit.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedHabit ? selectedHabit.name : 'Select a habit to view progress'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedHabit ? (
            <div className="space-y-6">
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="font-medium text-sm text-muted-foreground">
                    {day}
                  </div>
                ))}
                {calendarDays}
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span>Current Streak: </span>
                  <span className="font-semibold">{selectedHabit.streak} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Longest Streak: </span>
                  <span className="font-semibold">{selectedHabit.longestStreak} days</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Select a habit from the dropdown to view its monthly progress
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthView;
