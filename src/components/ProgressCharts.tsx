"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { LineChartIcon, BarChartIcon, CalendarIcon } from "lucide-react";

interface ProgressChartsProps {
  benchData?: {
    date: string;
    weight: number;
  }[];
  squatData?: {
    date: string;
    weight: number;
  }[];
}

const ProgressCharts = ({
  benchData = [
    { date: "2023-01-01", weight: 185 },
    { date: "2023-01-15", weight: 195 },
    { date: "2023-02-01", weight: 200 },
    { date: "2023-02-15", weight: 205 },
    { date: "2023-03-01", weight: 215 },
  ],
  squatData = [
    { date: "2023-01-01", weight: 225 },
    { date: "2023-01-15", weight: 245 },
    { date: "2023-02-01", weight: 265 },
    { date: "2023-02-15", weight: 275 },
    { date: "2023-03-01", weight: 295 },
  ],
}: ProgressChartsProps) => {
  const [timeRange, setTimeRange] = useState<string>("3m");
  const [chartType, setChartType] = useState<string>("line");

  // Calculate progress percentages
  const calculateProgress = (data: { date: string; weight: number }[]) => {
    if (data.length < 2) return 0;
    const firstWeight = data[0].weight;
    const lastWeight = data[data.length - 1].weight;
    return ((lastWeight - firstWeight) / firstWeight) * 100;
  };

  const benchProgress = calculateProgress(benchData);
  const squatProgress = calculateProgress(squatData);

  return (
    <div className="w-full bg-background p-4 rounded-xl">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Strength Progress</h2>
          <div className="flex space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Tabs
              value={chartType}
              onValueChange={setChartType}
              className="w-[120px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="line">
                  <LineChartIcon className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="bar">
                  <BarChartIcon className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between">
                <span>Bench Press 1RM</span>
                <span
                  className={`text-sm ${benchProgress >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {benchProgress >= 0 ? "+" : ""}
                  {benchProgress.toFixed(1)}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center">
                {/* Placeholder for actual chart component */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Chart visualization would render here
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border"></div>

                  {/* Simulated data points */}
                  {benchData.map((point, index) => {
                    const x = (index / (benchData.length - 1)) * 100;
                    const maxWeight = Math.max(
                      ...benchData.map((d) => d.weight),
                    );
                    const minWeight = Math.min(
                      ...benchData.map((d) => d.weight),
                    );
                    const range = maxWeight - minWeight;
                    const y =
                      100 -
                      (((point.weight - minWeight) / (range || 1)) * 80 + 10);

                    return (
                      <div
                        key={index}
                        className="absolute h-2 w-2 bg-primary rounded-full"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Current: {benchData[benchData.length - 1].weight} lbs
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between">
                <span>Squat 1RM</span>
                <span
                  className={`text-sm ${squatProgress >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {squatProgress >= 0 ? "+" : ""}
                  {squatProgress.toFixed(1)}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center">
                {/* Placeholder for actual chart component */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Chart visualization would render here
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border"></div>

                  {/* Simulated data points */}
                  {squatData.map((point, index) => {
                    const x = (index / (squatData.length - 1)) * 100;
                    const maxWeight = Math.max(
                      ...squatData.map((d) => d.weight),
                    );
                    const minWeight = Math.min(
                      ...squatData.map((d) => d.weight),
                    );
                    const range = maxWeight - minWeight;
                    const y =
                      100 -
                      (((point.weight - minWeight) / (range || 1)) * 80 + 10);

                    return (
                      <div
                        key={index}
                        className="absolute h-2 w-2 bg-primary rounded-full"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Current: {squatData[squatData.length - 1].weight} lbs
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Strength Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {/* Placeholder for comparison chart */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Comparison chart would render here
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border"></div>
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border"></div>

                {/* Legend */}
                <div className="absolute top-4 right-4 flex space-x-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-primary rounded-full mr-2"></div>
                    <span className="text-xs">Bench Press</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-secondary rounded-full mr-2"></div>
                    <span className="text-xs">Squat</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressCharts;
