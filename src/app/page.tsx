import Link from 'next/link';
import { ArrowRight, Code, Keyboard, LineChart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master Typing & Coding Skills with TypeSwift
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Improve your typing speed, accuracy, and coding proficiency with our interactive lessons, real-time feedback, and personalized practice sessions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-1.5">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/typing-test">
                  <Button size="lg" variant="outline">
                    Try Typing Test
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted p-4 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/0 opacity-60"></div>
                <div className="relative z-10 h-full w-full rounded-lg border bg-background p-6 shadow-sm">
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded-full bg-muted"></div>
                    <div className="h-4 w-full rounded-full bg-muted"></div>
                    <div className="h-4 w-full rounded-full bg-muted"></div>
                    <div className="h-4 w-3/4 rounded-full bg-muted"></div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary"></div>
                      <div className="h-6 w-24 rounded-full bg-primary/50"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded-full bg-muted"></div>
                      <div className="h-6 w-32 rounded-full bg-muted"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded-full bg-muted"></div>
                      <div className="h-6 w-20 rounded-full bg-muted"></div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="h-8 w-full rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                      Start Typing Practice
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Everything you need to improve your skills
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                TypeSwift provides a comprehensive set of tools and features to help you become a faster typist and better coder.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <Keyboard className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Typing Practice</CardTitle>
                <CardDescription>
                  Structured lessons for all skill levels with real-time feedback.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Progress through beginner to advanced typing exercises with customized difficulty levels.</p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 items-start">
                <Link href="/typing-levels">
                  <Button variant="ghost" className="gap-1">
                    Start Practice
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/typing-tutor">
                  <Button variant="ghost" className="gap-1">
                    Try Typing Tutor
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Code className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Coding Practice</CardTitle>
                <CardDescription>
                  Language-specific exercises to improve coding speed and accuracy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Practice typing real code in JavaScript, TypeScript, Python, and more with syntax highlighting.</p>
              </CardContent>
              <CardFooter>
                <Link href="/coding-practice">
                  <Button variant="ghost" className="gap-1">
                    Explore Languages
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <LineChart className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Performance Tracking</CardTitle>
                <CardDescription>
                  Detailed statistics and progress visualization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Track your WPM, accuracy, and improvement over time with comprehensive analytics.</p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard">
                  <Button variant="ghost" className="gap-1">
                    View Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to improve your typing skills?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join TypeSwift today and start your journey to faster, more accurate typing and coding.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg">
                  Sign Up Free
                </Button>
              </Link>
              <Link href="/typing-test">
                <Button size="lg" variant="outline">
                  Try a Quick Test
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}