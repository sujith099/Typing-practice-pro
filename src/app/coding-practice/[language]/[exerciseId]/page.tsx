'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Award, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateWPM, calculateAccuracy } from '@/lib/utils';

interface ExerciseType {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  codeSnippet: string;
}

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const language = params.language as string;
  const exerciseId = params.exerciseId as string;
  
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Mock data for different languages and exercises
  const exerciseData: Record<string, Record<string, ExerciseType>> = {
    javascript: {
      'variables': {
        id: 'variables',
        title: 'Variables and Data Types',
        description: 'Practice typing JavaScript variables and basic data types',
        difficulty: 'easy',
        estimatedTime: '5 min',
        codeSnippet: `let name = "John";
const age = 30;
let isActive = true;
const scores = [85, 90, 78];
const user = {
  id: 1,
  email: "john@example.com"
};`
      },
      'functions': {
        id: 'functions',
        title: 'Functions',
        description: 'Practice typing JavaScript functions and arrow functions',
        difficulty: 'medium',
        estimatedTime: '8 min',
        codeSnippet: `function calculateSum(a, b) {
  return a + b;
}

const multiply = (x, y) => x * y;

const greet = name => {
  return \`Hello, \${name}!\`;
};`
      },
      'arrays': {
        id: 'arrays',
        title: 'Array Methods',
        description: 'Practice typing common JavaScript array methods',
        difficulty: 'medium',
        estimatedTime: '10 min',
        codeSnippet: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);

const evenNumbers = numbers.filter(num => num % 2 === 0);

const sum = numbers.reduce((total, num) => total + num, 0);`
      },
      'objects': {
        id: 'objects',
        title: 'Objects and Properties',
        description: 'Practice typing JavaScript objects and their properties',
        difficulty: 'medium',
        estimatedTime: '8 min',
        codeSnippet: `const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Boston",
    state: "MA",
    zip: "02101"
  },
  isEmployed: true,
  hobbies: ["reading", "hiking", "coding"]
};

// Object destructuring
const { firstName, lastName, address: { city } } = person;

// Spread operator
const updatedPerson = { ...person, age: 31 };`
      },
      'classes': {
        id: 'classes',
        title: 'ES6 Classes',
        description: 'Practice typing JavaScript ES6 classes and inheritance',
        difficulty: 'hard',
        estimatedTime: '12 min',
        codeSnippet: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, my name is \${this.name}\`;
  }

  static createAnonymous() {
    return new Person("Anonymous", 0);
  }
}

class Employee extends Person {
  constructor(name, age, position, salary) {
    super(name, age);
    this.position = position;
    this.salary = salary;
  }

  promote(newPosition) {
    this.position = newPosition;
    this.salary += 5000;
  }
}

const john = new Employee("John", 30, "Developer", 80000);`
      },
      'async': {
        id: 'async',
        title: 'Async/Await',
        description: 'Practice typing asynchronous JavaScript code',
        difficulty: 'hard',
        estimatedTime: '15 min',
        codeSnippet: `// Promise example
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "User " + userId });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

// Using promises
fetchUserData(123)
  .then(user => console.log(user))
  .catch(error => console.error(error));

// Using async/await
async function getUserInfo(userId) {
  try {
    const user = await fetchUserData(userId);
    const permissions = await fetchPermissions(user.id);
    return { ...user, permissions };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}`
      },
      'modules': {
        id: 'modules',
        title: 'ES Modules',
        description: 'Practice typing JavaScript module imports and exports',
        difficulty: 'medium',
        estimatedTime: '10 min',
        codeSnippet: `// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export default class Calculator {
  multiply(a, b) {
    return a * b;
  }
  
  divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
}

// app.js
import Calculator, { add, subtract } from './math.js';

const calc = new Calculator();
console.log(add(5, 3));         // 8
console.log(subtract(10, 4));    // 6
console.log(calc.multiply(2, 6)); // 12
console.log(calc.divide(20, 5));  // 4`
      },
    },
    typescript: {
      'types': {
        id: 'types',
        title: 'Basic Types',
        description: 'Practice typing TypeScript basic types and annotations',
        difficulty: 'easy',
        estimatedTime: '5 min',
        codeSnippet: `let name: string = "John";
const age: number = 30;
let isActive: boolean = true;
const scores: number[] = [85, 90, 78];
const user: { id: number; email: string } = {
  id: 1,
  email: "john@example.com"
};`
      },
      'interfaces': {
        id: 'interfaces',
        title: 'Interfaces',
        description: 'Practice typing TypeScript interfaces and types',
        difficulty: 'medium',
        estimatedTime: '8 min',
        codeSnippet: `interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
}

type Point = {
  x: number;
  y: number;
};

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com"
};`
      },
      'generics': {
        id: 'generics',
        title: 'Generics',
        description: 'Practice typing TypeScript generics',
        difficulty: 'hard',
        estimatedTime: '12 min',
        codeSnippet: `function identity<T>(arg: T): T {
  return arg;
}

const stringIdentity = identity<string>("hello");
const numberIdentity = identity<number>(42);

interface GenericResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: GenericResponse<User> = {
  data: { id: 1, name: "John", email: "john@example.com" },
  status: 200,
  message: "Success"
};`
      },
      'classes': {
        id: 'classes',
        title: 'TypeScript Classes',
        description: 'Practice typing TypeScript classes with access modifiers',
        difficulty: 'medium',
        estimatedTime: '10 min',
        codeSnippet: `class Person {
  private _name: string;
  protected _age: number;
  readonly id: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
    this.id = Math.random() * 1000000 | 0;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (value.length > 0) {
      this._name = value;
    }
  }

  public greet(): string {
    return \`Hello, my name is \${this._name}\`;
  }
}

class Employee extends Person {
  private _department: string;
  private _salary: number;

  constructor(name: string, age: number, department: string, salary: number) {
    super(name, age);
    this._department = department;
    this._salary = salary;
  }

  public getDetails(): string {
    return \`\${this.name}, \${this._age}, \${this._department}\`;
  }
}`
      },
      'utility-types': {
        id: 'utility-types',
        title: 'Utility Types',
        description: 'Practice typing TypeScript utility types',
        difficulty: 'hard',
        estimatedTime: '15 min',
        codeSnippet: `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

// Partial - all properties optional
type PartialUser = Partial<User>;
const userUpdate: PartialUser = { name: "Jane" };

// Required - all properties required
type RequiredUser = Required<User>;

// Pick - select specific properties
type UserCredentials = Pick<User, 'email' | 'role'>;
const credentials: UserCredentials = { email: "jane@example.com", role: "admin" };

// Omit - remove specific properties
type PublicUser = Omit<User, 'createdAt' | 'updatedAt'>;

// Record - key-value pairs
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
const roles: UserRoles = {
  john: "admin",
  jane: "user",
  guest123: "guest"
};`
      },
      'mapped-types': {
        id: 'mapped-types',
        title: 'Mapped Types',
        description: 'Practice typing TypeScript mapped types',
        difficulty: 'hard',
        estimatedTime: '15 min',
        codeSnippet: `// Original interface
interface Person {
  name: string;
  age: number;
  email: string;
}

// Make all properties nullable
type Nullable<T> = { [P in keyof T]: T[P] | null };
const nullablePerson: Nullable<Person> = {
  name: "John",
  age: null,
  email: "john@example.com"
};

// Make all properties readonly
type ReadonlyPerson = Readonly<Person>;
const readonlyPerson: ReadonlyPerson = {
  name: "John",
  age: 30,
  email: "john@example.com"
};
// readonlyPerson.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property

// Custom mapped type with validation
type Validatable<T> = {
  [P in keyof T]: {
    value: T[P];
    isValid: boolean;
    errorMessage?: string;
  }
};

const validatedPerson: Validatable<Person> = {
  name: { value: "John", isValid: true },
  age: { value: -5, isValid: false, errorMessage: "Age must be positive" },
  email: { value: "john@example.com", isValid: true }
};`
      },
      'decorators': {
        id: 'decorators',
        title: 'TypeScript Decorators',
        description: 'Practice typing TypeScript decorators',
        difficulty: 'hard',
        estimatedTime: '15 min',
        codeSnippet: `// Class decorator
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// Method decorator
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  console.log('Target:', target);
  console.log('Property:', propertyName);
  console.log('Descriptor:', descriptor);
  
  // Store the original method
  const originalMethod = descriptor.value;
  
  // Modify the descriptor to wrap the original method
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${propertyName} with arguments: \${args}\`);
    const result = originalMethod.apply(this, args);
    console.log(\`Method \${propertyName} returned: \${result}\`);
    return result;
  };
}

// Property decorator
function Required(target: any, propertyName: string) {
  // Add validation metadata
  let validationMetadata = Reflect.getMetadata('validation', target) || {};
  validationMetadata[propertyName] = { required: true };
  Reflect.defineMetadata('validation', validationMetadata, target);
}

@Logger('LOGGING - PERSON')
class Person {
  @Required
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  @Log
  greet(phrase: string): string {
    return \`\${phrase} \${this.name}\`;
  }
}`
      },
    },
    python: {
      'basics': {
        id: 'basics',
        title: 'Python Basics',
        description: 'Practice typing Python variables and basic data types',
        difficulty: 'easy',
        estimatedTime: '5 min',
        codeSnippet: `name = "John"
age = 30
is_active = True
scores = [85, 90, 78]
user = {
    "id": 1,
    "email": "john@example.com"
}`
      },
      'functions': {
        id: 'functions',
        title: 'Functions',
        description: 'Practice typing Python functions and lambda expressions',
        difficulty: 'medium',
        estimatedTime: '8 min',
        codeSnippet: `def calculate_sum(a, b):
    return a + b

def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Lambda function
multiply = lambda x, y: x * y`
      },
      'comprehensions': {
        id: 'comprehensions',
        title: 'List Comprehensions',
        description: 'Practice typing Python list comprehensions',
        difficulty: 'medium',
        estimatedTime: '10 min',
        codeSnippet: `numbers = [1, 2, 3, 4, 5]

# List comprehension
doubled = [num * 2 for num in numbers]

# With condition
even_numbers = [num for num in numbers if num % 2 == 0]

# Dictionary comprehension
squared = {num: num ** 2 for num in numbers}`
      },
      'classes': {
        id: 'classes',
        title: 'Classes and OOP',
        description: 'Practice typing Python classes and object-oriented programming',
        difficulty: 'medium',
        estimatedTime: '12 min',
        codeSnippet: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def greet(self):
        return f"Hello, my name is {self.name}"
    
    @classmethod
    def create_anonymous(cls):
        return cls("Anonymous", 0)
    
    @staticmethod
    def is_adult(age):
        return age >= 18


class Employee(Person):
    def __init__(self, name, age, position, salary):
        super().__init__(name, age)
        self.position = position
        self.salary = salary
        
    def promote(self, new_position):
        self.position = new_position
        self.salary += 5000
        
    def __str__(self):
        return f"{self.name}, {self.position}"


john = Employee("John", 30, "Developer", 80000)
print(john.greet())
print(john)`
      },
      'decorators': {
        id: 'decorators',
        title: 'Python Decorators',
        description: 'Practice typing Python decorators',
        difficulty: 'hard',
        estimatedTime: '15 min',
        codeSnippet: `import time
from functools import wraps

# Simple decorator
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} executed in {end_time - start_time:.4f} seconds")
        return result
    return wrapper

# Decorator with arguments
def repeat(n=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(n):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

# Using the decorators
@timer
def factorial(n):
    return 1 if n <= 1 else n * factorial(n-1)

@repeat(3)
def greet(name):
    return f"Hello, {name}!"

print(factorial(10))
print(greet("John"))`
      },
      'generators': {
        id: 'generators',
        title: 'Generators and Iterators',
        description: 'Practice typing Python generators and iterators',
        difficulty: 'hard',
        estimatedTime: '12 min',
        codeSnippet: `# Simple generator function
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

# Using the generator
for number in count_up_to(5):
    print(number)

# Generator expression
squares = (x**2 for x in range(1, 6))
print(list(squares))  # [1, 4, 9, 16, 25]

# Custom iterator class
class Fibonacci:
    def __init__(self, limit):
        self.limit = limit
        self.a, self.b = 0, 1
        self.count = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.limit:
            raise StopIteration
        
        result = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return result

# Using the iterator
for fib in Fibonacci(10):
    print(fib, end=" ")`
      },
      'async': {
        id: 'async',
        title: 'Async Programming',
        description: 'Practice typing Python async/await code',
        difficulty: 'hard',
        estimatedTime: '15 min',
        codeSnippet: `import asyncio

# Simple async function
async def fetch_data(id):
    print(f"Fetching data for id: {id}")
    await asyncio.sleep(1)  # Simulate network delay
    return {"id": id, "name": f"Item {id}"}

# Multiple async operations
async def fetch_multiple_data(ids):
    tasks = [fetch_data(id) for id in ids]
    results = await asyncio.gather(*tasks)
    return results

# Using async with context manager
class AsyncResource:
    async def __aenter__(self):
        print("Acquiring resource")
        await asyncio.sleep(0.5)
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("Releasing resource")
        await asyncio.sleep(0.5)
    
    async def process(self, data):
        print(f"Processing {data}")
        await asyncio.sleep(1)
        return f"Processed {data}"

# Main async function
async def main():
    # Fetch data concurrently
    data = await fetch_multiple_data([1, 2, 3])
    print(data)
    
    # Use async context manager
    async with AsyncResource() as resource:
        result = await resource.process("sample data")
        print(result)

# Run the async program
asyncio.run(main())`
      },
    },
  };

  const currentExercise = exerciseData[language]?.[exerciseId] || {
    id: 'not-found',
    title: 'Exercise Not Found',
    description: 'The requested exercise does not exist.',
    difficulty: 'easy' as const,
    estimatedTime: 'N/A',
    codeSnippet: ''
  };

  useEffect(() => {
    if (isStarted && !isCompleted) {
      timerRef.current = setInterval(() => {
        if (startTime) {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          setElapsedTime(elapsed);
          
          // Calculate current WPM and accuracy
          const currentWpm = calculateWPM(currentInput, elapsed);
          const currentAccuracy = calculateAccuracy(currentInput, currentExercise.codeSnippet.substring(0, currentInput.length));
          
          setWpm(currentWpm);
          setAccuracy(currentAccuracy);
        }
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isStarted, isCompleted, startTime, currentInput, currentExercise.codeSnippet]);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCurrentInput(value);
    
    // Normalize both strings to handle different line endings
    const normalizedInput = value.replace(/\r\n/g, '\n');
    const normalizedTarget = currentExercise.codeSnippet.replace(/\r\n/g, '\n');
    
    // Check if exercise is completed
    if (normalizedInput === normalizedTarget) {
      setIsCompleted(true);
      setEndTime(Date.now());
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = () => {
    setIsStarted(false);
    setIsCompleted(false);
    setCurrentInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setElapsedTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getProgressPercentage = () => {
    if (currentExercise.codeSnippet.length === 0) return 0;
    return (currentInput.length / currentExercise.codeSnippet.length) * 100;
  };

  const getPerformanceRating = () => {
    if (wpm >= 60 && accuracy >= 95) return 'Excellent';
    if (wpm >= 40 && accuracy >= 90) return 'Good';
    if (wpm >= 20 && accuracy >= 85) return 'Average';
    return 'Needs Practice';
  };

  const getNextExerciseId = () => {
    // Get all exercise IDs for the current language
    const exerciseIds = Object.keys(exerciseData[language] || {});
    
    // Find the index of the current exercise
    const currentIndex = exerciseIds.indexOf(exerciseId);
    
    // If found and not the last exercise, return the next one
    if (currentIndex !== -1 && currentIndex < exerciseIds.length - 1) {
      return exerciseIds[currentIndex + 1];
    }
    
    return null;
  };
  
  const nextExerciseId = getNextExerciseId();

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Link href={`/coding-practice/${language}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {language.charAt(0).toUpperCase() + language.slice(1)} Exercises
            </Button>
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{currentExercise.title}</h1>
          <p className="text-muted-foreground">
            {currentExercise.description}
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{formatTime(elapsedTime)}</span>
                </div>
                <div className="flex items-center">
                  <span>WPM: {wpm}</span>
                </div>
                <div className="flex items-center">
                  <span>Accuracy: {accuracy.toFixed(1)}%</span>
                </div>
              </div>
              {isStarted && (
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RefreshCcw className="mr-2 h-3 w-3" />
                  Reset
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isStarted ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="text-center space-y-2">
                  <p>Ready to start the coding exercise?</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span>{currentExercise.estimatedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="capitalize">{currentExercise.difficulty}</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleStart}>Start Coding</Button>
              </div>
            ) : isCompleted ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold">Exercise Completed!</h3>
                  <p>Great job! Here's your performance:</p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm">Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatTime(elapsedTime)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm">WPM</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{wpm}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm">Accuracy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{accuracy.toFixed(1)}%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm">Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{getPerformanceRating()}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleReset}>Try Again</Button>
                  {nextExerciseId ? (
                    <Link href={`/coding-practice/${language}/${nextExerciseId}`}>
                      <Button variant="secondary">Next Exercise</Button>
                    </Link>
                  ) : null}
                  <Link href={`/coding-practice/${language}`}>
                    <Button variant="outline">Back to Exercises</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative p-4 rounded-md bg-muted/50 font-mono text-sm overflow-auto max-h-[400px] custom-scrollbar">
                  <div className="relative">
                    {currentExercise.codeSnippet.split('').map((char, index) => {
                      let className = '';
                      let isCurrentChar = index === currentInput.length;
                      
                      if (index < currentInput.length) {
                        className = currentInput[index] === char ? 'text-green-500' : 'text-red-500';
                      }
                      
                      return (
                        <span 
                          key={index} 
                          className={`${className} ${isCurrentChar ? 'bg-primary/30 relative' : ''}`}
                          ref={isCurrentChar ? (el) => {
                            if (el) {
                              // Scroll to current character if it's out of view
                              const container = el.closest('div[class*="overflow-auto"]');
                              if (container) {
                                const containerRect = container.getBoundingClientRect();
                                const elRect = el.getBoundingClientRect();
                                
                                if (elRect.bottom > containerRect.bottom || elRect.top < containerRect.top) {
                                  el.scrollIntoView({ block: 'center' });
                                }
                              }
                            }
                          } : null}
                        >
                          {char === '\n' ? <br /> : char}
                          {isCurrentChar && <span className="absolute h-5 w-0.5 bg-primary animate-blink"></span>}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(getProgressPercentage())}%</span>
                  </div>
                  <Progress value={getProgressPercentage()} />
                </div>
                <textarea
                  ref={inputRef}
                  value={currentInput}
                  onChange={handleInputChange}
                  className="w-full h-32 p-4 rounded-md border bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Start typing here..."
                  spellCheck="false"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}