import React from "react";
import { Link } from "react-router-dom";
import { HabitProvider } from "@/context/HabitContext";
import DayView from "@/components/DayView";
import MonthView from "@/components/MonthView";
import ProgressView from "@/components/ProgressView";
import BadgesView from "@/components/BadgesView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, BarChart3, Award, ArrowLeft } from "lucide-react";

const Tracker = () => {
  return (
    <HabitProvider>
      <div className="min-h-screen bg-background">
        <header className="py-6 border-b">
          <div className="container">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-habit-purple">
                Streak<span className="text-foreground">Canvas</span>
              </h1>
              <p className="text-muted-foreground">
                Track your habits, build your streaks
              </p>
            </div>
          </div>
        </header>

        <main className="container py-6">
          <Tabs defaultValue="day" className="space-y-6">
            <TabsList className="w-full flex justify-center">
              <TabsTrigger value="day" className="flex-1 max-w-[120px]">
                <Calendar className="h-4 w-4 mr-2" />
                Daily
              </TabsTrigger>
              <TabsTrigger value="month" className="flex-1 max-w-[120px]">
                <Calendar className="h-4 w-4 mr-2" />
                Monthly
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex-1 max-w-[120px]">
                <BarChart3 className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex-1 max-w-[120px]">
                <Award className="h-4 w-4 mr-2" />
                Badges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="day">
              <DayView />
            </TabsContent>

            <TabsContent value="month">
              <MonthView />
            </TabsContent>

            <TabsContent value="progress">
              <ProgressView />
            </TabsContent>

            <TabsContent value="badges">
              <BadgesView />
            </TabsContent>
          </Tabs>
        </main>

        <footer className="py-4 border-t">
          <div className="container text-center text-sm text-muted-foreground">
            StreakCanvas — Build better habits, one day at a time
          </div>
        </footer>
      </div>
    </HabitProvider>
  );
};

export default Tracker;
