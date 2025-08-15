"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Calendar, CheckCircle, Dumbbell } from "lucide-react";

interface Exercise {
  name: string;
  sets: {
    reps: number;
    weight: number;
    completed: boolean;
  }[];
}

interface WorkoutDay {
  day: number;
  type: string;
  date: string;
  exercises: Exercise[];
}

interface CurrentWorkoutProps {
  workout?: WorkoutDay;
  onComplete?: () => void;
}

const CurrentWorkout = ({
  workout = {
    day: 1,
    type: "Push Day",
    date: new Date().toLocaleDateString(),
    exercises: [
      {
        name: "Bench Press",
        sets: [
          { reps: 5, weight: 185, completed: false },
          { reps: 5, weight: 185, completed: false },
          { reps: 5, weight: 185, completed: false },
          { reps: 5, weight: 185, completed: false },
          { reps: 5, weight: 185, completed: false },
        ],
      },
      {
        name: "Overhead Press",
        sets: [
          { reps: 8, weight: 95, completed: false },
          { reps: 8, weight: 95, completed: false },
          { reps: 8, weight: 95, completed: false },
        ],
      },
      {
        name: "Incline Dumbbell Press",
        sets: [
          { reps: 10, weight: 60, completed: false },
          { reps: 10, weight: 60, completed: false },
          { reps: 10, weight: 60, completed: false },
        ],
      },
      {
        name: "Tricep Pushdowns",
        sets: [
          { reps: 12, weight: 50, completed: false },
          { reps: 12, weight: 50, completed: false },
          { reps: 12, weight: 50, completed: false },
        ],
      },
    ],
  },
  onComplete = () => {},
}: CurrentWorkoutProps) => {
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutDay>(workout);

  const handleSetComplete = (exerciseIndex: number, setIndex: number) => {
    const updatedWorkout = { ...currentWorkout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].completed =
      !updatedWorkout.exercises[exerciseIndex].sets[setIndex].completed;
    setCurrentWorkout(updatedWorkout);
  };

  const handleWorkoutComplete = () => {
    // In a real app, this would save the workout to the user's history
    onComplete();
  };

  const calculateProgress = () => {
    const totalSets = currentWorkout.exercises.reduce(
      (total, exercise) => total + exercise.sets.length,
      0,
    );
    const completedSets = currentWorkout.exercises.reduce(
      (total, exercise) =>
        total + exercise.sets.filter((set) => set.completed).length,
      0,
    );
    return (completedSets / totalSets) * 100;
  };

  const isWorkoutComplete = () => {
    return currentWorkout.exercises.every((exercise) =>
      exercise.sets.every((set) => set.completed),
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-background">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">
                Current Workout
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" /> {currentWorkout.date}
              </CardDescription>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant="outline" className="mb-2">
                Day {currentWorkout.day}
              </Badge>
              <Badge>{currentWorkout.type}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm">
                {Math.round(calculateProgress())}%
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>

          <Tabs defaultValue="exercises">
            <TabsList className="mb-4">
              <TabsTrigger value="exercises">Exercises</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="exercises" className="space-y-6">
              {currentWorkout.exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell className="h-5 w-5" />
                    <h3 className="text-lg font-medium">{exercise.name}</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground mb-2">
                    <div>Set</div>
                    <div>Reps</div>
                    <div>Weight (lbs)</div>
                    <div>Completed</div>
                  </div>

                  <Separator className="mb-3" />

                  {exercise.sets.map((set, setIndex) => (
                    <div
                      key={setIndex}
                      className="grid grid-cols-4 gap-2 items-center py-2 border-b last:border-0"
                    >
                      <div>{setIndex + 1}</div>
                      <div>{set.reps}</div>
                      <div>{set.weight}</div>
                      <div>
                        <Checkbox
                          checked={set.completed}
                          onCheckedChange={() =>
                            handleSetComplete(exerciseIndex, setIndex)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="notes">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Workout Notes</h3>
                <p className="text-muted-foreground">
                  Focus on proper form for all exercises. Rest 2-3 minutes
                  between compound lifts and 1-2 minutes between accessory
                  exercises.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline">Previous Workout</Button>
          <Button
            onClick={handleWorkoutComplete}
            disabled={!isWorkoutComplete()}
            className="flex items-center gap-2"
          >
            {isWorkoutComplete() ? (
              <>
                <CheckCircle className="h-4 w-4" /> Mark Complete
              </>
            ) : (
              <>
                Mark Complete <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CurrentWorkout;
