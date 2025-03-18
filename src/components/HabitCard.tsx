
import React from 'react';
import { useHabits } from '@/context/HabitContext';
import { Habit } from '@/types/habit';
import { CheckCircle, Circle, Flame, MoreHorizontal, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HabitCardProps {
  habit: Habit;
}

const categoryColors = {
  fitness: 'bg-habit-green',
  health: 'bg-habit-blue',
  mindfulness: 'bg-habit-purple',
  learning: 'bg-habit-yellow',
  productivity: 'bg-habit-red',
  creativity: 'bg-habit-purple-light'
};

const categoryIcons = {
  fitness: '💪',
  health: '❤️',
  mindfulness: '🧘',
  learning: '📚',
  productivity: '✅',
  creativity: '🎨'
};

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { toggleHabitCompletion, deleteHabit, isHabitCompletedOnDate, selectedDate } = useHabits();
  
  const isCompleted = isHabitCompletedOnDate(habit.id, selectedDate);
  
  const handleToggle = () => {
    toggleHabitCompletion(habit.id, selectedDate);
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center">
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mr-3", categoryColors[habit.category])}>
            <span>{categoryIcons[habit.category]}</span>
          </div>
          <CardTitle className="text-base font-medium">{habit.name}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => deleteHabit(habit.id)}>
              <Trash className="h-4 w-4 mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full transition-colors",
              isCompleted ? "text-habit-purple hover:text-habit-purple/90" : "text-muted-foreground"
            )}
            onClick={handleToggle}
          >
            {isCompleted ? (
              <CheckCircle className="h-6 w-6 fill-habit-purple text-white" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </Button>
          <span className="text-sm text-muted-foreground">
            {isCompleted ? "Completed" : "Mark as done"}
          </span>
        </div>
        <div className="flex items-center">
          <Flame className={cn(
            "h-5 w-5 mr-1", 
            habit.streak > 0 ? "text-habit-yellow" : "text-muted-foreground",
            habit.streak >= 7 && "animate-streak-pulse"
          )} />
          <span className="font-semibold">{habit.streak}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
