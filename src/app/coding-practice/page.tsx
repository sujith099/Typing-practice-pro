import Link from 'next/link';
import { ArrowRight, Code, FileCode, Braces } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface LanguageCategory {
  title: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  topics: {
    title: string;
    slug: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }[];
}

const languageCategories: LanguageCategory[] = [
  {
    title: 'JavaScript',
    slug: 'javascript',
    description: 'Practice typing JavaScript code with proper syntax and formatting',
    icon: <Braces className="h-8 w-8" />,
    color: 'bg-yellow-500/10 text-yellow-500',
    topics: [
      {
        title: 'Variables & Data Types',
        slug: 'variables',
        description: 'Learn to type JavaScript variables and data types',
        difficulty: 'beginner',
      },
      {
        title: 'Functions & Scope',
        slug: 'functions',
        description: 'Practice with function declarations and scope',
        difficulty: 'intermediate',
      },
      {
        title: 'Array Methods',
        slug: 'arrays',
        description: 'Practice typing common JavaScript array methods',
        difficulty: 'intermediate',
      },
      {
        title: 'Objects & Properties',
        slug: 'objects',
        description: 'Master JavaScript objects and their properties',
        difficulty: 'intermediate',
      },
      {
        title: 'ES6 Classes',
        slug: 'classes',
        description: 'Practice with class syntax and inheritance',
        difficulty: 'advanced',
      },
      {
        title: 'Async/Await & Promises',
        slug: 'async',
        description: 'Master asynchronous JavaScript patterns',
        difficulty: 'advanced',
      },
      {
        title: 'ES Modules',
        slug: 'modules',
        description: 'Practice with modern JavaScript modules',
        difficulty: 'advanced',
      },
    ],
  },
  {
    title: 'TypeScript',
    slug: 'typescript',
    description: 'Improve your TypeScript typing skills with static types and interfaces',
    icon: <FileCode className="h-8 w-8" />,
    color: 'bg-blue-500/10 text-blue-500',
    topics: [
      {
        title: 'Basic Types',
        slug: 'types',
        description: 'Practice with TypeScript primitive types',
        difficulty: 'beginner',
      },
      {
        title: 'Interfaces & Types',
        slug: 'interfaces',
        description: 'Learn to type complex type definitions',
        difficulty: 'intermediate',
      },
      {
        title: 'Classes & Access Modifiers',
        slug: 'classes',
        description: 'Practice with TypeScript classes and modifiers',
        difficulty: 'intermediate',
      },
      {
        title: 'Generics',
        slug: 'generics',
        description: 'Master TypeScript generic types',
        difficulty: 'advanced',
      },
      {
        title: 'Utility Types',
        slug: 'utility-types',
        description: 'Practice with built-in utility types',
        difficulty: 'advanced',
      },
      {
        title: 'Mapped Types',
        slug: 'mapped-types',
        description: 'Create powerful mapped type transformations',
        difficulty: 'advanced',
      },
      {
        title: 'Decorators',
        slug: 'decorators',
        description: 'Advanced TypeScript decorators',
        difficulty: 'advanced',
      },
    ],
  },
  {
    title: 'Python',
    slug: 'python',
    description: 'Practice typing Python code with proper indentation and syntax',
    icon: <Code className="h-8 w-8" />,
    color: 'bg-green-500/10 text-green-500',
    topics: [
      {
        title: 'Basic Syntax',
        slug: 'basics',
        description: 'Learn Python fundamentals and syntax',
        difficulty: 'beginner',
      },
      {
        title: 'Functions',
        slug: 'functions',
        description: 'Practice with Python functions',
        difficulty: 'beginner',
      },
      {
        title: 'List Comprehensions',
        slug: 'comprehensions',
        description: 'Master Python list comprehensions',
        difficulty: 'intermediate',
      },
      {
        title: 'Classes & OOP',
        slug: 'classes',
        description: 'Practice with Python classes and OOP concepts',
        difficulty: 'intermediate',
      },
      {
        title: 'Decorators',
        slug: 'decorators',
        description: 'Learn Python function decorators',
        difficulty: 'advanced',
      },
      {
        title: 'Generators & Iterators',
        slug: 'generators',
        description: 'Practice with generators and iterators',
        difficulty: 'advanced',
      },
      {
        title: 'Async Programming',
        slug: 'async',
        description: 'Master async/await in Python',
        difficulty: 'advanced',
      },
    ],
  },
];

export default function CodingPracticePage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Coding Practice</h1>
          <p className="text-muted-foreground">
            Improve your coding speed and accuracy by practicing with real code snippets.
          </p>
        </div>

        {/* Language Categories */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {languageCategories.map((category) => (
            <Card key={category.slug}>
              <CardHeader>
                <div className={`w-12 h-12 rounded-md flex items-center justify-center mb-2 ${category.color}`}>
                  {category.icon}
                </div>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.topics.map((topic) => (
                    <Link 
                      key={topic.slug} 
                      href={`/coding-practice/${category.slug}/${topic.slug}`}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div>
                        <div className="font-medium">{topic.title}</div>
                        <div className="text-sm text-muted-foreground">{topic.description}</div>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          topic.difficulty === 'beginner' ? 'bg-green-500/10 text-green-500' :
                          topic.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {topic.difficulty}
                        </span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/coding-practice/${category.slug}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View All {category.title} Exercises
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Popular Exercises */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Popular Exercises</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="bg-blue-500/10 text-blue-500 w-8 h-8 rounded-md flex items-center justify-center mb-2">
                  <FileCode className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">TypeScript Interfaces</CardTitle>
                <CardDescription>Practice defining complex types</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto">
                  <pre>{`interface User {
  id: number;
  name: string;
  email?: string;
  preferences: UserPrefs;
}`}</pre>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/coding-practice/typescript/interfaces" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Start Exercise
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="bg-yellow-500/10 text-yellow-500 w-8 h-8 rounded-md flex items-center justify-center mb-2">
                  <Braces className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">JavaScript Promises</CardTitle>
                <CardDescription>Async code practice</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto">
                  <pre>{`async function fetchData() {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}`}</pre>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/coding-practice/javascript/async" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Start Exercise
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="bg-green-500/10 text-green-500 w-8 h-8 rounded-md flex items-center justify-center mb-2">
                  <Code className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Python Classes</CardTitle>
                <CardDescription>OOP typing practice</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto">
                  <pre>{`class Animal:
    def __init__(self, name):
        self.name = name
        
    def speak(self):
        pass
        
class Dog(Animal):
    def speak(self):
        return f"{self.name} says woof!"`}</pre>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/coding-practice/python/functions-classes" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Start Exercise
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="bg-purple-500/10 text-purple-500 w-8 h-8 rounded-md flex items-center justify-center mb-2">
                  <Code className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">React Hooks</CardTitle>
                <CardDescription>Practice with React patterns</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto">
                  <pre>{`function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`}</pre>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/coding-practice/javascript/react" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Start Exercise
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Tags Scroller */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Browse by Tag</h2>
          <div className="flex overflow-x-auto pb-2 space-x-2">
            {['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'Algorithms', 'Data Structures', 'Functional', 'OOP', 'Async', 'Testing'].map((tag) => (
              <Link 
                key={tag} 
                href={`/coding-practice/tags/${tag.toLowerCase().replace('/', '-')}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors whitespace-nowrap"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* AI-Assisted Learning */}
        <div className="mt-8">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-2xl font-bold">AI-Assisted Code Explanations</h2>
                <p className="text-muted-foreground">
                  Get personalized explanations for code snippets you find challenging. Our AI assistant will break down complex concepts and provide helpful context.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button>
                    Try AI Explanations
                  </Button>
                  <Button variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3 bg-muted/30 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-muted rounded"></div>
                  <div className="h-2 w-full bg-muted rounded"></div>
                  <div className="h-2 w-5/6 bg-muted rounded"></div>
                  <div className="h-2 w-2/3 bg-muted rounded"></div>
                </div>
                <div className="mt-4 p-2 bg-primary/10 rounded text-xs text-center text-primary">
                  AI-generated explanation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}