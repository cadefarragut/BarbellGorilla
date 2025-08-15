"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Calendar,
  Dumbbell,
  FileText,
  PlusCircle,
  User,
} from "lucide-react";
import ProgressCharts from "./ProgressCharts";
import { Separator } from "@/components/ui/separator";

interface WorkoutDay {
  day: number;
  type: string;
  completed: boolean;
  date: string;
}

interface DashboardProps {
  username?: string;
  currentWorkoutPlan?: string;
  daysCompleted?: number;
  totalDays?: number;
  recentWorkouts?: WorkoutDay[];
}

export default function Dashboard({
  username = "John Doe",
  currentWorkoutPlan = "Strength Builder Pro",
  daysCompleted = 12,
  totalDays = 30,
  recentWorkouts = [
    { day: 12, type: "Push Day", completed: true, date: "2023-06-15" },
    { day: 11, type: "Pull Day", completed: true, date: "2023-06-13" },
    { day: 10, type: "Leg Day", completed: true, date: "2023-06-11" },
    { day: 9, type: "Push Day", completed: true, date: "2023-06-09" },
  ],
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col w-full min-h-screen bg-background p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=gorilla"
              alt={username}
            />
            <AvatarFallback>
              {username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {username}</h1>
            <p className="text-muted-foreground">
              Track your progress and manage your workouts
            </p>
          </div>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Generate New Workout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="progress">
            <Dumbbell className="mr-2 h-4 w-4" /> Progress
          </TabsTrigger>
          <TabsTrigger value="workouts">
            <Calendar className="mr-2 h-4 w-4" /> Workouts
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active workout plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl font-bold">{currentWorkoutPlan}</div>
                  <div className="text-sm text-muted-foreground">
                    Day {daysCompleted} of {totalDays}
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full mt-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(daysCompleted / totalDays) * 100}%` }}
                    />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    <FileText className="mr-2 h-4 w-4" /> View Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Today's Workout</CardTitle>
                <CardDescription>Your scheduled session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl font-bold">Push Day</div>
                  <div className="text-sm text-muted-foreground">
                    Day {daysCompleted + 1} - 5 exercises
                  </div>
                  <Button className="mt-4 w-full">Start Workout</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Current Stats</CardTitle>
                <CardDescription>Your latest one-rep maxes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Bench Press</span>
                      <span className="text-sm font-bold">225 lbs</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full mt-1">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "65%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Squat</span>
                      <span className="text-sm font-bold">315 lbs</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full mt-1">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
              <CardDescription>Your strength gains over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ProgressCharts />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Workouts</CardTitle>
              <CardDescription>Your latest completed sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWorkouts.map((workout, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Dumbbell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{workout.type}</div>
                          <div className="text-sm text-muted-foreground">
                            Day {workout.day}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {workout.date}
                      </div>
                    </div>
                    {index < recentWorkouts.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Strength Progress</CardTitle>
              <CardDescription>
                Track your one-rep max improvements
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ProgressCharts />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workouts">
          <Card>
            <CardHeader>
              <CardTitle>Workout Timeline</CardTitle>
              <CardDescription>
                Your workout history and schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Workout Calendar</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your workout calendar will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Profile Settings</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your profile settings will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
