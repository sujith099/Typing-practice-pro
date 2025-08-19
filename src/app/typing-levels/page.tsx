import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Award } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LevelCategory {
  title: string;
  slug: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  image: string;
}

const levelCategories: LevelCategory[] = [
  {
    title: 'Beginner',
    slug: 'beginner',
    description: 'Master the basics of typing with proper finger placement and technique',
    progress: 100,
    totalLessons: 10,
    completedLessons: 10,
    image: '/images/beginner.svg',
  },
  {
    title: 'Intermediate',
    slug: 'intermediate',
    description: 'Improve your speed and accuracy with more complex exercises',
    progress: 68,
    totalLessons: 15,
    completedLessons: 10,
    image: '/images/intermediate.svg',
  },
  {
    title: 'Advanced',
    slug: 'advanced',
    description: 'Perfect your typing skills with challenging exercises and specialized drills',
    progress: 12,
    totalLessons: 20,
    completedLessons: 2,
    image: '/images/advanced.svg',
  },
];

export default function TypingLevelsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Typing Levels</h1>
          <p className="text-muted-foreground">
            Choose a level category to start practicing and improving your typing skills.
          </p>
        </div>

        {/* Level Categories */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {levelCategories.map((category) => (
            <Card key={category.slug} className="overflow-hidden">
              <div className="aspect-video w-full bg-muted flex items-center justify-center">
                {/* Placeholder for category image */}
                <div className="text-4xl font-bold text-primary/20">{category.title}</div>
              </div>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{category.progress}%</span>
                    </div>
                    <Progress value={category.progress} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-1 h-4 w-4 text-primary" />
                      <span>{category.completedLessons}/{category.totalLessons} Lessons</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>~{category.totalLessons * 10} mins</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/typing-levels/${category.slug}`} className="w-full">
                  <Button className="w-full">
                    {category.progress === 100 ? 'Review Lessons' : 'Continue Lessons'}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Quick Access */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Access</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommended</CardTitle>
                <CardDescription>Based on your progress</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">Intermediate Lesson 11: Speed Drills</p>
              </CardContent>
              <CardFooter>
                <Link href="/typing-levels/intermediate/11" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Start Lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Most Popular</CardTitle>
                <CardDescription>Community favorite</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">Advanced Lesson 3: Code Snippets</p>
              </CardContent>
              <CardFooter>
                <Link href="/typing-levels/advanced/3" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Start Lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Daily Challenge</CardTitle>
                <CardDescription>Refresh your skills</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">Random selection of exercises</p>
              </CardContent>
              <CardFooter>
                <Link href="/typing-levels/daily-challenge" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Start Challenge
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Typing Test</CardTitle>
                <CardDescription>Measure your progress</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">Check your current WPM and accuracy</p>
              </CardContent>
              <CardFooter>
                <Link href="/typing-test" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Take Test
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Your Achievements</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/20">
              <Award className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium text-center">Speed Demon</span>
              <span className="text-xs text-muted-foreground text-center">80+ WPM</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/20">
              <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium text-center">Perfectionist</span>
              <span className="text-xs text-muted-foreground text-center">98%+ Accuracy</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/20">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium text-center">Dedicated</span>
              <span className="text-xs text-muted-foreground text-center">10+ Hours</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/20 opacity-50">
              <Award className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium text-center">Code Master</span>
              <span className="text-xs text-muted-foreground text-center">Locked</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/20 opacity-50">
              <Award className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium text-center">Consistent</span>
              <span className="text-xs text-muted-foreground text-center">Locked</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/20 opacity-50">
              <Award className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium text-center">Expert</span>
              <span className="text-xs text-muted-foreground text-center">Locked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}