
import React from 'react';
import { useHabits } from '@/context/HabitContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge as BadgeType } from '@/types/habit';
import { Award, Brain, Crown, Dumbbell, Flame, Lock, Trophy } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

const BadgesView: React.FC = () => {
  const { badges } = useHabits();
  
  const renderBadgeIcon = (badge: BadgeType) => {
    switch (badge.icon) {
      case 'award':
        return <Award className="h-8 w-8" />;
      case 'flame':
        return <Flame className="h-8 w-8" />;
      case 'trophy':
        return <Trophy className="h-8 w-8" />;
      case 'crown':
        return <Crown className="h-8 w-8" />;
      case 'dumbbell':
        return <Dumbbell className="h-8 w-8" />;
      case 'brain':
        return <Brain className="h-8 w-8" />;
      default:
        return <Award className="h-8 w-8" />;
    }
  };
  
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Achievements</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Unlocked Badges ({unlockedBadges.length})</h3>
        {unlockedBadges.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground">
              You haven't unlocked any badges yet. Keep building your habits!
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {unlockedBadges.map(badge => (
              <Card key={badge.id} className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={cn(
                    "h-16 w-16 rounded-full flex items-center justify-center mb-4 relative overflow-hidden",
                    "bg-habit-purple/10 text-habit-purple"
                  )}>
                    {renderBadgeIcon(badge)}
                    <div className="absolute inset-0 bg-white/20 rotate-12 translate-x-full animate-badge-shine" />
                  </div>
                  <h4 className="font-semibold mb-1">{badge.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                  {badge.unlockedAt && (
                    <p className="text-xs text-muted-foreground">
                      Earned on {format(parseISO(badge.unlockedAt), 'PP')}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Locked Badges ({lockedBadges.length})</h3>
        {lockedBadges.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-foreground">
              Congratulations! You've unlocked all available badges.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {lockedBadges.map(badge => (
              <Card key={badge.id} className="overflow-hidden bg-muted/40">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center mb-4 bg-muted text-muted-foreground">
                    <Lock className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold mb-1">{badge.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {badge.type === 'streak' && `Reach a ${badge.requirement}-day streak`}
                    {badge.type === 'completion' && `Complete ${badge.requirement} habits`}
                    {badge.type === 'category' && badge.category && 
                      `Complete ${badge.requirement} ${badge.category} habits`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgesView;
