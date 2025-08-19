'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Code, Clock, Award } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ExerciseType {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  codeSnippet: string;
}

export default function LanguagePracticePage() {
  const params = useParams();
  const language = params.language as string;
  
  // Mock data for different languages
  const languageData: Record<string, { title: string; description: string; exercises: ExerciseType[] }> = {
    javascript: {
      title: 'JavaScript Coding Practice',
      description: 'Improve your JavaScript typing skills with these coding exercises.',
      exercises: [
        {
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
        {
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
  return "Hello, " + name + "!";
};`
        },
        {
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
        {
          id: 'objects',
          title: 'Objects & Properties',
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

// Adding properties
person.email = "john.doe@example.com";

// Object methods
const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022,
  start() {
    return "Starting " + this.brand + " " + this.model;
  }
};`
        },
        {
          id: 'classes',
          title: 'ES6 Classes',
          description: 'Practice typing ES6 class syntax and inheritance',
          difficulty: 'hard',
          estimatedTime: '12 min',
          codeSnippet: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "Hello, my name is " + this.name;
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

  getDetails() {
    return this.name + ", " + this.position + ", $" + this.salary;
  }
}`
        },
        {
          id: 'async',
          title: 'Async/Await & Promises',
          description: 'Practice typing asynchronous JavaScript patterns',
          difficulty: 'hard',
          estimatedTime: '15 min',
          codeSnippet: `// Creating a promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: "Product" };
      if (data) {
        resolve(data);
      } else {
        reject("Error fetching data");
      }
    }, 2000);
  });
};

// Using promises
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/await
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Multiple promises
async function fetchMultipleResources() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(res => res.json()),
    fetch('/api/posts').then(res => res.json())
  ]);
  return { users, posts };
}`
        },
        {
          id: 'modules',
          title: 'ES Modules',
          description: 'Practice typing modern JavaScript modules',
          difficulty: 'hard',
          estimatedTime: '10 min',
          codeSnippet: `// math.js
export const PI = 3.14159;

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
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  }
}

// app.js
import Calculator, { PI, add, subtract } from './math.js';

console.log(PI); // 3.14159
console.log(add(5, 3)); // 8

const calc = new Calculator();
console.log(calc.multiply(4, 2)); // 8

// Dynamic import
async function loadModule() {
  const { default: Formatter } = await import('./formatter.js');
  return new Formatter();
}`
        },
      ],
    },
    typescript: {
      title: 'TypeScript Coding Practice',
      description: 'Improve your TypeScript typing skills with these coding exercises.',
      exercises: [
        {
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
};

// Tuple type
let tuple: [string, number] = ["coordinates", 42];

// Enum type
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
const playerDirection: Direction = Direction.Up;`
        },
        {
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
};

// Interface extension
interface Employee extends User {
  department: string;
  salary: number;
}

// Implementing interfaces
interface Printable {
  print(): void;
}

class Document implements Printable {
  content: string;
  
  constructor(content: string) {
    this.content = content;
  }
  
  print() {
    console.log(this.content);
  }
}`
        },
        {
          id: 'classes',
          title: 'Classes & Access Modifiers',
          description: 'Practice typing TypeScript classes and modifiers',
          difficulty: 'medium',
          estimatedTime: '10 min',
          codeSnippet: `class Person {
  private name: string;
  protected age: number;
  public readonly id: number;
  
  constructor(name: string, age: number, id: number) {
    this.name = name;
    this.age = age;
    this.id = id;
  }
  
  public getName(): string {
    return this.name;
  }
  
  protected getDetails(): string {
    return this.name + ", " + this.age + " years old";
  }
}

class Employee extends Person {
  private department: string;
  
  constructor(name: string, age: number, id: number, department: string) {
    super(name, age, id);
    this.department = department;
  }
  
  public getEmployeeInfo(): string {
    return this.getDetails() + ", Department: " + this.department;
  }
  
  // Parameter properties shorthand
  static createManager(name: string, age: number, id: number) {
    return new Employee(name, age, id, "Management");
  }
}`
        },
        {
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
};

// Generic constraints
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Generic classes
class GenericBox<T> {
  private value: T;
  
  constructor(value: T) {
    this.value = value;
  }
  
  getValue(): T {
    return this.value;
  }
}`
        },
        {
          id: 'utility-types',
          title: 'Utility Types',
          description: 'Practice with TypeScript built-in utility types',
          difficulty: 'hard',
          estimatedTime: '15 min',
          codeSnippet: `interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

// Partial - all properties optional
type PartialUser = Partial<User>;
const userUpdate: PartialUser = { name: "Jane" };

// Required - all properties required
type RequiredUser = Required<User>;

// Pick - select specific properties
type UserCredentials = Pick<User, "email" | "id">;
const credentials: UserCredentials = { id: 1, email: "user@example.com" };

// Omit - remove specific properties
type PublicUser = Omit<User, "email" | "createdAt">;

// Record - create a type with specified properties
type Roles = "admin" | "user" | "guest";
type RoleAccess = Record<Roles, boolean>;

const access: RoleAccess = {
  admin: true,
  user: true,
  guest: false
};

// ReturnType - extract return type of a function
function createUser(name: string, email: string): User {
  return { id: 1, name, email, role: "user", createdAt: new Date() };
}

type NewUser = ReturnType<typeof createUser>;`
        },
        {
          id: 'mapped-types',
          title: 'Mapped Types',
          description: 'Practice with TypeScript mapped types',
          difficulty: 'hard',
          estimatedTime: '15 min',
          codeSnippet: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Basic mapped type
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Mapped type with conditional types
type OptionalProps<T> = {
  [K in keyof T]?: T[K];
};

type OptionalUser = OptionalProps<User>;

// Mapped type example
type Getters<T> = {
  [K in keyof T as string]: () => T[K];
};

type UserGetters = Getters<User>;
// Results in getter methods for User properties

// Mapped type with filtering
type FilteredKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type StringKeys = FilteredKeys<User, string>; // "name" | "email"

// Practical example: validation schema
type ValidationSchema<T> = {
  [K in keyof T]: {
    required: boolean;
    validator: (value: T[K]) => boolean;
    errorMessage: string;
  };
};`
        },
        {
          id: 'decorators',
          title: 'Decorators',
          description: 'Practice with TypeScript decorators',
          difficulty: 'hard',
          estimatedTime: '15 min',
          codeSnippet: `// Class decorator
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger('LOGGING - PERSON')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

// Method decorator
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  console.log('Method decorator!');
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
}

// Property decorator
function Log2(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target);
  console.log(propertyName);
}

class Product {
  @Log2
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}`
        },
      ],
    },
    python: {
      title: 'Python Coding Practice',
      description: 'Improve your Python typing skills with these coding exercises.',
      exercises: [
        {
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
}

# Multiple assignment
x, y, z = 1, 2, 3

# String formatting
formatted_string = f"User {name} is {age} years old"

# Type hints (Python 3.5+)
from typing import List, Dict

def process_scores(scores: List[int]) -> float:
    return sum(scores) / len(scores)`
        },
        {
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
multiply = lambda x, y: x * y

# Function with *args and **kwargs
def flexible_function(*args, **kwargs):
    print(f"Positional arguments: {args}")
    print(f"Keyword arguments: {kwargs}")
    
# Higher-order function
def apply_operation(func, x, y):
    return func(x, y)
    
result = apply_operation(calculate_sum, 5, 3)  # Returns 8`
        },
        {
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
squared = {num: num ** 2 for num in numbers}

# Nested comprehensions
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]

# Set comprehension
unique_letters = {letter for letter in "mississippi"}

# Generator expression (memory efficient)
sum_of_squares = sum(x**2 for x in range(1, 1001))`
        },
        {
          id: 'classes',
          title: 'Classes & OOP',
          description: 'Practice with Python classes and OOP concepts',
          difficulty: 'medium',
          estimatedTime: '12 min',
          codeSnippet: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def greet(self):
        return f"Hello, my name is {self.name}"
    
    @property
    def birth_year(self):
        import datetime
        current_year = datetime.datetime.now().year
        return current_year - self.age
        
    @classmethod
    def from_birth_year(cls, name, birth_year):
        import datetime
        current_year = datetime.datetime.now().year
        age = current_year - birth_year
        return cls(name, age)
        
# Inheritance
class Employee(Person):
    def __init__(self, name, age, job_title, salary):
        super().__init__(name, age)
        self.job_title = job_title
        self.salary = salary
        
    def get_promotion(self, amount):
        self.salary += amount
        return f"{self.name} got a promotion! New salary: {self.salary}"`
        },
        {
          id: 'decorators',
          title: 'Decorators',
          description: 'Practice with Python function decorators',
          difficulty: 'hard',
          estimatedTime: '15 min',
          codeSnippet: `import functools
import time

# Basic decorator
def simple_decorator(func):
    @functools.wraps(func)  # Preserves function metadata
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@simple_decorator
def add(a, b):
    return a + b

# Decorator with arguments
def repeat(n):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello(name):
    print(f"Hello, {name}!")
    
# Practical decorator: timing
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.2f} seconds to run")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done!"`
        },
        {
          id: 'generators',
          title: 'Generators & Iterators',
          description: 'Practice with Python generators and iterators',
          difficulty: 'hard',
          estimatedTime: '15 min',
          codeSnippet: `# Simple generator function
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

# Using the generator
for number in count_up_to(5):
    print(number)  # Prints 1, 2, 3, 4, 5

# Generator expression
squares = (x**2 for x in range(10))

# Infinite sequence generator
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Custom iterator class
class Countdown:
    def __init__(self, start):
        self.start = start
        
    def __iter__(self):
        return self
        
    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1

# Using the iterator
for num in Countdown(5):
    print(num)  # Prints 5, 4, 3, 2, 1`
        },
        {
          id: 'async',
          title: 'Async Programming',
          description: 'Practice with Python async/await syntax',
          difficulty: 'hard',
          estimatedTime: '15 min',
          codeSnippet: `import asyncio
import aiohttp
import time

# Basic async function
async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)

# Running multiple coroutines
async def main():
    print(f"started at {time.strftime('%X')}")
    
    await say_after(1, 'hello')
    await say_after(2, 'world')
    
    print(f"finished at {time.strftime('%X')}")

# Concurrent execution with gather
async def fetch_data(session, url):
    async with session.get(url) as response:
        return await response.text()

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_data(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

# Using asyncio.create_task
async def concurrent_example():
    task1 = asyncio.create_task(say_after(1, 'task 1'))
    task2 = asyncio.create_task(say_after(2, 'task 2'))
    
    print(f"started at {time.strftime('%X')}")
    
    # Wait until both tasks are completed
    await task1
    await task2
    
    print(f"finished at {time.strftime('%X')}")`
        },
      ],
    },
  };

  const currentLanguage = languageData[language] || {
    title: 'Language Not Found',
    description: 'The requested coding language does not exist.',
    exercises: [],
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Link href="/coding-practice">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Languages
            </Button>
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{currentLanguage.title}</h1>
          <p className="text-muted-foreground">
            {currentLanguage.description}
          </p>
        </div>

        {currentLanguage.exercises.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentLanguage.exercises.map((exercise) => (
              <Card key={exercise.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span>{exercise.estimatedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="capitalize">{exercise.difficulty}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link 
                    href={`/coding-practice/${language}/${exercise.id}`} 
                    className="w-full"
                  >
                    <Button className="w-full">
                      <Code className="mr-2 h-4 w-4" />
                      Start Exercise
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">No Exercises Found</h2>
              <p className="text-muted-foreground">
                The requested language does not have any exercises available.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}