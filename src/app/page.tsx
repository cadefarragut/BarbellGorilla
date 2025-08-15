import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dumbbell,
  ChevronRight,
  BarChart2,
  Calendar,
  FileText,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            <span className="text-xl font-bold">Barbell Gorilla</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:underline"
            >
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <div className="ml-4 flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container flex flex-col items-center text-center gap-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                FORGE YOUR STRENGTH WITH{" "}
                <span className="gold-text">BARBELL GORILLA</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px] mx-auto font-bold uppercase tracking-wide">
                IRON-FORGED TRAINING PROGRAMS • CONCRETE PLATE MENTALITY • OLD
                SCHOOL GAINS
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
            <div className="relative w-full max-w-5xl mt-8 rounded-lg overflow-hidden border shadow-xl vintage-frame">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80"
                alt="Intense powerlifting with concrete plates"
                className="w-full h-auto object-cover sepia-tone"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent vintage-overlay"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Powerful Features
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Everything you need to optimize your strength training journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="vintage-card concrete-texture">
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="uppercase tracking-wider">
                    IRON-FORGED PROGRAMS
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">
                    Custom training blueprints based on your max lifts. No
                    fluff, just results.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Built like the old masters did it - progressive overload,
                    compound movements, and relentless pursuit of strength.
                  </p>
                </CardContent>
              </Card>

              <Card className="vintage-card concrete-texture">
                <CardHeader>
                  <BarChart2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="uppercase tracking-wider">
                    STRENGTH METRICS
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">
                    Track every pound, every rep, every victory. Numbers don't
                    lie.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Monitor your ascent from novice to elite. Watch your one-rep
                    max climb like the legends before you.
                  </p>
                </CardContent>
              </Card>

              <Card className="vintage-card concrete-texture">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="uppercase tracking-wider">
                    TRAINING LOG
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">
                    Your iron journey documented. Every session matters.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Chronicle your path to greatness. From your first plate to
                    personal records that echo through the gym.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                How It Works
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Get started with Barbell Gorilla in three simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Enter Your One-Rep Max
                </h3>
                <p className="text-muted-foreground">
                  Input your current bench press and squat one-rep max values.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Generate Your Plan</h3>
                <p className="text-muted-foreground">
                  Our algorithm creates a personalized workout plan to increase
                  your strength.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
                <p className="text-muted-foreground">
                  Follow your plan and monitor your strength gains over time.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Button size="lg" asChild>
                <Link href="/signup">Start Your Journey</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials/Preview Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Dashboard Preview
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Take a look at what your personalized dashboard will look like.
              </p>
            </div>

            <div className="max-w-4xl mx-auto border rounded-lg overflow-hidden shadow-lg">
              <Tabs defaultValue="progress" className="w-full">
                <div className="bg-card p-4 border-b">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="progress">Progress Charts</TabsTrigger>
                    <TabsTrigger value="current">Current Workout</TabsTrigger>
                    <TabsTrigger value="generate">Generate Plan</TabsTrigger>
                  </TabsList>
                </div>
                <div className="bg-background p-6">
                  <TabsContent value="progress" className="mt-0">
                    <div className="h-[400px] flex items-center justify-center flex-col gap-4">
                      <BarChart2 className="h-16 w-16 text-muted-foreground/50" />
                      <p className="text-muted-foreground text-center max-w-md">
                        Track your strength progress over time with interactive
                        charts showing your bench press and squat one-rep max
                        improvements.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="current" className="mt-0">
                    <div className="h-[400px] flex items-center justify-center flex-col gap-4">
                      <Calendar className="h-16 w-16 text-muted-foreground/50" />
                      <p className="text-muted-foreground text-center max-w-md">
                        View your current day's workout with detailed exercises,
                        sets, reps, and weights tailored to your strength level.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="generate" className="mt-0">
                    <div className="h-[400px] flex items-center justify-center flex-col gap-4">
                      <FileText className="h-16 w-16 text-muted-foreground/50" />
                      <p className="text-muted-foreground text-center max-w-md">
                        Generate new workout plans by entering your updated
                        one-rep max values and customize your training
                        parameters.
                      </p>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground concrete-texture">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4 uppercase">
              READY TO JOIN THE IRON BROTHERHOOD?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 font-bold uppercase tracking-wide">
              STEP INTO THE TEMPLE • EMBRACE THE GRIND • BECOME LEGENDARY
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="uppercase tracking-wider font-bold"
            >
              <Link href="/signup">ENTER THE GYM</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-background">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            <span className="font-semibold">Barbell Gorilla</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Barbell Gorilla. All rights reserved.
          </div>
          <nav className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
