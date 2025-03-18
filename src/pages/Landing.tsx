import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  BarChart3,
  Award,
  CheckCircle2,
  Users,
  Clock,
  Target,
  Star,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Brain,
  Bell,
  Zap,
  Shield,
  LineChart,
  Trophy,
  Heart,
  BrainCircuit,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface CategoryData {
  name: string;
  value: number;
  streak: number;
}

// Sample data for the dashboard
const weeklyData = [
  { name: "Mon", completed: 8, total: 10, streak: 5 },
  { name: "Tue", completed: 9, total: 10, streak: 6 },
  { name: "Wed", completed: 7, total: 10, streak: 7 },
  { name: "Thu", completed: 10, total: 10, streak: 8 },
  { name: "Fri", completed: 8, total: 10, streak: 9 },
  { name: "Sat", completed: 9, total: 10, streak: 10 },
  { name: "Sun", completed: 10, total: 10, streak: 11 },
];

const categoryData: CategoryData[] = [
  { name: "Fitness", value: 30, streak: 15 },
  { name: "Health", value: 25, streak: 12 },
  { name: "Mindfulness", value: 20, streak: 8 },
  { name: "Learning", value: 15, streak: 5 },
  { name: "Productivity", value: 10, streak: 3 },
];

const COLORS = ["#10B981", "#3B82F6", "#9B87F5", "#FBBF24", "#EF4444"];

const DashboardPreview = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Weekly Progress</h3>
          <p className="text-sm text-muted-foreground">
            Current Streak: 11 days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-habit-purple"></div>
          <span className="text-sm">Completed</span>
        </div>
      </div>

      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip
              formatter={(value: number, name: string) => [`${value}/10`, name]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Bar dataKey="completed" fill="#7c3aed" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Category Distribution</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `${value}% (${
                      categoryData.find((d) => d.value === value)?.streak || 0
                    } days)`,
                    categoryData.find((d) => d.value === value)?.name || "",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Streak Progress</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 12]} />
                <Tooltip
                  formatter={(value: number) => [`${value} days`, "Streak"]}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="streak"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  dot={{ fill: "#7c3aed", strokeWidth: 2 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTestimonials = () => {
    const testimonialsSection = document.getElementById("testimonials-section");
    testimonialsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFAQ = () => {
    const faqSection = document.getElementById("faq-section");
    faqSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 border-b">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold text-habit-purple">
            Streak<span className="text-foreground">Canvas</span>
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/tracker"
              className="px-4 py-2 bg-habit-purple text-white rounded-md hover:bg-habit-purple/90 transition-colors"
            >
              Start Tracking
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-habit-purple/10 text-habit-purple mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Transform Your Life
                  </span>
                </div>

                <h2 className="text-5xl font-bold mb-6 leading-tight">
                  Master Your Habits,{" "}
                  <span className="text-habit-purple">
                    Unlock Your Potential
                  </span>
                </h2>

                <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                  Join thousands of achievers who are building lasting habits
                  with StreakCanvas. Track, analyze, and celebrate your progress
                  every day.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link to="/tracker">
                    <Button
                      size="lg"
                      className="bg-habit-purple hover:bg-habit-purple/90"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={scrollToFeatures}
                  >
                    Watch Demo
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-2">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User1" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User2" />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User3" />
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Trusted by 10,000+ users
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content - Dashboard Preview */}
              <div className="relative">
                <div className="relative z-10">
                  <DashboardPreview />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-habit-purple/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-habit-purple/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features-section" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Powerful Features
              </Badge>
              <h3 className="text-3xl font-bold mb-4">
                Everything You Need to Build Better Habits
              </h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover how StreakCanvas helps you track, analyze, and master
                your habits with powerful features designed for your success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Core Features */}
              <div className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-habit-purple/10 text-habit-purple">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold">Smart Tracking</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Track your habits with flexible daily and monthly views. Set
                  custom schedules and get reminders to stay on track.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Customizable schedules
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Smart reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Progress visualization
                  </li>
                </ul>
              </div>

              <div className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-habit-purple/10 text-habit-purple">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold">AI Insights</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Get personalized insights and recommendations based on your
                  habit patterns and progress.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Pattern analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Smart suggestions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Progress predictions
                  </li>
                </ul>
              </div>

              <div className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-habit-purple/10 text-habit-purple">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold">Achievement System</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Stay motivated with our comprehensive achievement system and
                  celebrate your milestones.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Custom badges
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Milestone tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Achievement sharing
                  </li>
                </ul>
              </div>

              <div className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-habit-purple/10 text-habit-purple">
                    <LineChart className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold">Advanced Analytics</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Deep dive into your habit data with comprehensive analytics
                  and progress tracking.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Detailed statistics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Progress reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Data visualization
                  </li>
                </ul>
              </div>

              <div className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-habit-purple/10 text-habit-purple">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold">Privacy First</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Your data is secure and private. We use industry-standard
                  encryption to protect your information.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Data control
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Regular backups
                  </li>
                </ul>
              </div>

              <div className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-habit-purple/10 text-habit-purple">
                    <Users className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold">Community Support</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Join a community of like-minded individuals and share your
                  journey with others.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Community forums
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Success stories
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-habit-purple" />
                    Accountability groups
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature CTA */}
            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="bg-habit-purple hover:bg-habit-purple/90"
                onClick={scrollToTestimonials}
              >
                See What Users Say
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-muted/20">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-habit-purple mb-2">
                  10K+
                </div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-habit-purple mb-2">
                  500K+
                </div>
                <div className="text-muted-foreground">Habits Tracked</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-habit-purple mb-2">
                  95%
                </div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-habit-purple mb-2">
                  30+
                </div>
                <div className="text-muted-foreground">Days Average Streak</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" variant="outline" onClick={scrollToFAQ}>
                Have Questions?
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials-section" className="py-20">
          <div className="container">
            <h3 className="text-3xl font-bold text-center mb-12">
              What Our Users Say
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      Fitness Enthusiast
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-muted-foreground">
                  "StreakCanvas has completely transformed how I approach my
                  daily habits. The streak tracking keeps me motivated!"
                </p>
              </div>
              <div className="p-6 rounded-lg border">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">
                      Professional Developer
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-muted-foreground">
                  "The insights and analytics help me understand my progress
                  better. It's like having a personal habit coach!"
                </p>
              </div>
              <div className="p-6 rounded-lg border">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" />
                    <AvatarFallback>ED</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Emma Davis</div>
                    <div className="text-sm text-muted-foreground">Student</div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-muted-foreground">
                  "The achievement badges make habit tracking fun and rewarding.
                  I love seeing my collection grow!"
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link to="/tracker">
                <Button
                  size="lg"
                  className="bg-habit-purple hover:bg-habit-purple/90"
                >
                  Join Our Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq-section" className="py-20 bg-muted/20">
          <div className="container">
            <h3 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h3>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How does streak tracking work?
                  </AccordionTrigger>
                  <AccordionContent>
                    StreakCanvas tracks your daily habit completion. When you
                    complete a habit on consecutive days, your streak increases.
                    Missing a day resets the streak, helping you stay
                    accountable and motivated.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Can I track multiple habits?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! You can track as many habits as you want across
                    different categories like fitness, health, mindfulness,
                    learning, productivity, and creativity.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How do achievement badges work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Achievement badges are earned by reaching specific
                    milestones, such as maintaining a streak for a certain
                    number of days or completing habits consistently over time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is my data private?</AccordionTrigger>
                  <AccordionContent>
                    Yes, your data is completely private and secure. We use
                    industry-standard encryption to protect your information,
                    and you have full control over your data.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="text-center mt-8">
              <Link to="/tracker">
                <Button
                  size="lg"
                  className="bg-habit-purple hover:bg-habit-purple/90"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who are building better habits with
              StreakCanvas.
            </p>
            <Link to="/tracker">
              <Button
                size="lg"
                className="bg-habit-purple hover:bg-habit-purple/90 px-8 py-6 text-lg"
              >
                Start Tracking Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>StreakCanvas — Build better habits, one day at a time</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
