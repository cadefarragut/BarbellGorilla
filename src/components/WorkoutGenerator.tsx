"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Slider } from "../components/ui/slider";
import { Download, FileText, Save } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

interface WorkoutGeneratorProps {
  onSave?: (workoutPlan: WorkoutPlan) => void;
  defaultBenchMax?: number;
  defaultSquatMax?: number;
}

interface WorkoutPlan {
  benchMax: number;
  squatMax: number;
  duration: number;
  frequency: string;
  generatedDate: Date;
}

const WorkoutGenerator = ({
  onSave = () => {},
  defaultBenchMax = 135,
  defaultSquatMax = 185,
}: WorkoutGeneratorProps) => {
  const [benchMax, setBenchMax] = useState<number>(defaultBenchMax);
  const [squatMax, setSquatMax] = useState<number>(defaultSquatMax);
  const [duration, setDuration] = useState<number>(8);
  const [frequency, setFrequency] = useState<string>("3");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("input");

  const handleBenchMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBenchMax(value);
    }
  };

  const handleSquatMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setSquatMax(value);
    }
  };

  const handleDurationChange = (value: number[]) => {
    setDuration(value[0]);
  };

  const handleFrequencyChange = (value: string) => {
    setFrequency(value);
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate API call or calculation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      setActiveTab("preview");
    }, 1500);
  };

  const handleSave = () => {
    const workoutPlan: WorkoutPlan = {
      benchMax,
      squatMax,
      duration,
      frequency,
      generatedDate: new Date(),
    };

    onSave(workoutPlan);
    // Show success message or redirect
  };

  const handleDownloadPDF = () => {
    // Logic to generate and download PDF would go here
    console.log("Downloading PDF...");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Workout Plan Generator
        </CardTitle>
        <CardDescription>
          Enter your one-rep max values to generate a personalized strength
          training program.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="preview" disabled={!isGenerated}>
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="bench-max">Bench Press 1RM (lbs)</Label>
                <Input
                  id="bench-max"
                  type="number"
                  min="1"
                  value={benchMax}
                  onChange={handleBenchMaxChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="squat-max">Squat 1RM (lbs)</Label>
                <Input
                  id="squat-max"
                  type="number"
                  min="1"
                  value={squatMax}
                  onChange={handleSquatMaxChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Program Duration (weeks): {duration}</Label>
              <Slider
                defaultValue={[duration]}
                min={4}
                max={16}
                step={1}
                onValueChange={handleDurationChange}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="frequency">
                Workout Frequency (days per week)
              </Label>
              <Select value={frequency} onValueChange={handleFrequencyChange}>
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="4">4 days</SelectItem>
                  <SelectItem value="5">5 days</SelectItem>
                  <SelectItem value="6">6 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Workout Plan"}
            </Button>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {isGenerated && (
              <>
                <Alert>
                  <AlertDescription>
                    Your personalized {duration}-week workout plan has been
                    generated based on your one-rep maxes.
                  </AlertDescription>
                </Alert>

                <div className="border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Bench Press 1RM
                      </p>
                      <p className="text-xl font-semibold">{benchMax} lbs</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Squat 1RM</p>
                      <p className="text-xl font-semibold">{squatMax} lbs</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-xl font-semibold">{duration} weeks</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Frequency</p>
                      <p className="text-xl font-semibold">
                        {frequency} days/week
                      </p>
                    </div>
                  </div>

                  {/* Sample workout preview */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Week 1 Sample</h3>
                    <div className="border-t pt-2">
                      <p className="font-medium">Day 1 - Push</p>
                      <ul className="list-disc list-inside text-sm pl-2">
                        <li>
                          Bench Press: 3 sets × 5 reps @{" "}
                          {Math.round(benchMax * 0.75)} lbs
                        </li>
                        <li>Overhead Press: 3 sets × 8 reps</li>
                        <li>Incline Dumbbell Press: 3 sets × 10 reps</li>
                        <li>Tricep Extensions: 3 sets × 12 reps</li>
                      </ul>
                    </div>
                    <div className="border-t mt-2 pt-2">
                      <p className="font-medium">Day 2 - Pull</p>
                      <ul className="list-disc list-inside text-sm pl-2">
                        <li>Deadlift: 3 sets × 5 reps</li>
                        <li>Barbell Rows: 3 sets × 8 reps</li>
                        <li>Pull-ups: 3 sets × max reps</li>
                        <li>Bicep Curls: 3 sets × 12 reps</li>
                      </ul>
                    </div>
                    <div className="border-t mt-2 pt-2">
                      <p className="font-medium">Day 3 - Legs</p>
                      <ul className="list-disc list-inside text-sm pl-2">
                        <li>
                          Squat: 3 sets × 5 reps @ {Math.round(squatMax * 0.75)}{" "}
                          lbs
                        </li>
                        <li>Romanian Deadlift: 3 sets × 8 reps</li>
                        <li>Leg Press: 3 sets × 10 reps</li>
                        <li>Calf Raises: 3 sets × 15 reps</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {isGenerated && (
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => setActiveTab("input")}
          >
            Edit Inputs
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            Save Plan
          </Button>
          <Button
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={handleDownloadPDF}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default WorkoutGenerator;
