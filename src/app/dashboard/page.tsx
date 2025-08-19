import Link from 'next/link';
import { ArrowRight, Clock, Award, BarChart2, BookOpen, History } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress and continue your typing practice.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average WPM
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Accuracy
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                +3% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lessons Completed
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                8 this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Practice Time
              </CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2h</div>
              <p className="text-xs text-muted-foreground">
                1.5h this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Progress Chart */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full">
                    {/* Placeholder for chart */}
                    <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                      <div className="flex flex-col items-center gap-1 text-center">
                        <BarChart2 className="h-8 w-8 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          WPM over time
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Recommended Practice */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recommended Practice</CardTitle>
                  <CardDescription>
                    Based on your recent performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-medium text-primary">1</span>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Advanced Finger Placement
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Improve your home row technique
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-medium text-primary">2</span>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          TypeScript Syntax Practice
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Focus on coding accuracy
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/typing-levels/advanced" className="w-full">
                    <Button className="w-full">
                      Start Recommended Practice
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Course Progress */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Beginner Course</CardTitle>
                  <CardDescription>Basic typing fundamentals</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <Progress className="mt-2" value={100} />
                </CardContent>
                <CardFooter>
                  <Link href="/typing-levels/beginner" className="w-full">
                    <Button variant="outline" className="w-full">
                      Review Course
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Intermediate Course</CardTitle>
                  <CardDescription>Speed and accuracy training</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <Progress className="mt-2" value={68} />
                </CardContent>
                <CardFooter>
                  <Link href="/typing-levels/intermediate" className="w-full">
                    <Button className="w-full">
                      Continue Course
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Advanced Course</CardTitle>
                  <CardDescription>Expert typing techniques</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <Progress className="mt-2" value={12} />
                </CardContent>
                <CardFooter>
                  <Link href="/typing-levels/advanced" className="w-full">
                    <Button className="w-full">
                      Continue Course
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skill Development</CardTitle>
                <CardDescription>
                  Track your improvement across different metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Speed (WPM)</span>
                      <span className="text-sm font-medium">65/120</span>
                    </div>
                    <Progress value={54} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Accuracy</span>
                      <span className="text-sm font-medium">92/100</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Consistency</span>
                      <span className="text-sm font-medium">78/100</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Code Typing</span>
                      <span className="text-sm font-medium">45/100</span>
                    </div>
                    <Progress value={45} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest typing sessions and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Intermediate Lesson 12</p>
                      <p className="text-sm text-muted-foreground">Today at 10:24 AM</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">72 WPM</p>
                        <p className="text-xs text-muted-foreground">95% Accuracy</p>
                      </div>
                      <Link href="/typing-levels/intermediate/12">
                        <Button size="sm" variant="ghost">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">TypeScript Practice</p>
                      <p className="text-sm text-muted-foreground">Yesterday at 3:45 PM</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">58 WPM</p>
                        <p className="text-xs text-muted-foreground">89% Accuracy</p>
                      </div>
                      <Link href="/coding-practice/typescript/functions">
                        <Button size="sm" variant="ghost">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Typing Test</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">68 WPM</p>
                        <p className="text-xs text-muted-foreground">91% Accuracy</p>
                      </div>
                      <Link href="/typing-test">
                        <Button size="sm" variant="ghost">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}