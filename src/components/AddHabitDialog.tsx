
import React, { useState } from 'react';
import { useHabits } from '@/context/HabitContext';
import { HabitCategory } from '@/types/habit';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

const categoryOptions: { value: HabitCategory; label: string; icon: string }[] = [
  { value: 'fitness', label: 'Fitness', icon: '💪' },
  { value: 'health', label: 'Health', icon: '❤️' },
  { value: 'mindfulness', label: 'Mindfulness', icon: '🧘' },
  { value: 'learning', label: 'Learning', icon: '📚' },
  { value: 'productivity', label: 'Productivity', icon: '✅' },
  { value: 'creativity', label: 'Creativity', icon: '🎨' },
];

const AddHabitDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [category, setCategory] = useState<HabitCategory | ''>('');
  const { addHabit } = useHabits();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim() && category) {
      addHabit(habitName.trim(), category as HabitCategory);
      setHabitName('');
      setCategory('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full lg:w-auto bg-habit-purple hover:bg-habit-purple-dark">
          <Plus className="mr-2 h-5 w-5" /> Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="habit-name">Habit Name</Label>
            <Input
              id="habit-name"
              placeholder="e.g., Drink water, Meditate, Read"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as HabitCategory)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!habitName.trim() || !category}>Create Habit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;
