import React from "react";
import { useHabits } from "@/context/HabitContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { HabitCategory } from "@/types/habit";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const categoryNames: Record<HabitCategory, string> = {
  fitness: "Fitness",
  health: "Health",
  mindfulness: "Mindfulness",
  learning: "Learning",
  productivity: "Productivity",
  creativity: "Creativity",
};

const categoryColors: Record<HabitCategory, string> = {
  fitness: "#10B981",
  health: "#3B82F6",
  mindfulness: "#9B87F5",
  learning: "#FBBF24",
  productivity: "#EF4444",
  creativity: "#D6BCFA",
};

const ProgressView: React.FC = () => {
  const { habits, habitsByCategory, getCompletionRateForMonth } = useHabits();

  const currentMonth = new Date();

  // Get habits with the longest streaks
  const topStreakHabits = [...habits]
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 5);

  // Get habit categories distribution
  const categoryDistribution = Object.entries(habitsByCategory).map(
    ([category, habits]) => ({
      name: categoryNames[category as HabitCategory] || category,
      value: habits.length,
      color: categoryColors[category as HabitCategory] || "#9B87F5",
    })
  );

  // Get completion rates for the current month
  const completionRates = habits.map((habit) => ({
    name: habit.name,
    completionRate: getCompletionRateForMonth(habit.id, currentMonth),
    category: habit.category,
  }));

  return (
    <div className="space-y-6">
      <Tabs defaultValue="streaks">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="completion">Completion</TabsTrigger>
        </TabsList>

        <TabsContent value="streaks" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              {topStreakHabits.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No streak data available yet
                </div>
              ) : (
                <div className="space-y-4">
                  {topStreakHabits.map((habit) => (
                    <div key={habit.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {habit.name}
                        </span>
                        <span className="text-sm font-semibold">
                          {habit.streak} days
                        </span>
                      </div>
                      <Progress
                        value={Math.min((habit.streak / 30) * 100, 100)}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryDistribution.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No categories data available yet
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryDistribution}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completion" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Monthly Completion Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completionRates.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No completion data available yet
                </div>
              ) : (
                <div className="space-y-4">
                  {completionRates.map((habit, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {habit.name}
                        </span>
                        <span className="text-sm font-semibold">
                          {Math.round(habit.completionRate)}%
                        </span>
                      </div>
                      <Progress
                        value={habit.completionRate}
                        className="h-2"
                        style={{
                          backgroundColor: categoryColors[habit.category],
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressView;
