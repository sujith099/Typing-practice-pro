'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Clock, Code, RotateCcw, Settings, Trophy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateAccuracy, calculateWPM } from '@/lib/utils';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: 'js' },
  { id: 'typescript', name: 'TypeScript', icon: 'ts' },
  { id: 'python', name: 'Python', icon: 'py' },
];

const DIFFICULTY_LEVELS = [
  { id: 'easy', name: 'Easy', description: 'Basic syntax and simple functions' },
  { id: 'medium', name: 'Medium', description: 'Intermediate concepts and algorithms' },
  { id: 'hard', name: 'Hard', description: 'Advanced patterns and complex logic' },
];

const TEST_DURATIONS = [
  { id: '1', name: '1 minute', seconds: 60 },
  { id: '3', name: '3 minutes', seconds: 180 },
  { id: '5', name: '5 minutes', seconds: 300 },
];

const CODE_SAMPLES = {
  javascript: {
    easy: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

const numbers = [1, 2, 3, 4, 5];
const result = calculateSum(numbers);
console.log(result); // 15`,
    medium: `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

const unsortedArray = [3, 6, 8, 10, 1, 2, 1];
const sortedArray = quickSort(unsortedArray);
console.log(sortedArray);`,
    hard: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    const newNode = new Node(value);
    
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
}`
  },
  typescript: {
    easy: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

console.log(greet(user.name));`,
    medium: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function inOrderTraversal<T>(
  node: TreeNode<T> | null,
  callback: (value: T) => void
): void {
  if (node !== null) {
    inOrderTraversal(node.left, callback);
    callback(node.value);
    inOrderTraversal(node.right, callback);
  }
}

type Comparator<T> = (a: T, b: T) => number;

function binarySearch<T>(
  arr: T[],
  target: T,
  comparator: Comparator<T>
): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = comparator(arr[mid], target);
    
    if (comparison === 0) return mid;
    if (comparison < 0) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}`,
    hard: `type EventHandler<T> = (data: T) => void;

class EventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Array<EventHandler<T[K]>>
  } = {};
  
  on<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    
    this.listeners[event]!.push(handler);
  }
  
  off<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
    if (!this.listeners[event]) return;
    
    this.listeners[event] = this.listeners[event]!.filter(
      (h) => h !== handler
    );
  }
  
  emit<K extends keyof T>(event: K, data: T[K]): void {
    if (!this.listeners[event]) return;
    
    this.listeners[event]!.forEach((handler) => {
      handler(data);
    });
  }
}`
  },
  python: {
    easy: `def calculate_average(numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

def is_palindrome(text):
    text = text.lower()
    return text == text[::-1]

numbers = [10, 15, 20, 25, 30]

average = calculate_average(numbers)
print(f"The average is: {average}")

word = "Radar"
print(f"Is '{word}' a palindrome? {is_palindrome(word)}")`,
    medium: `class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

def is_balanced(expression):
    stack = Stack()
    brackets = {')': '(', '}': '{', ']': '['}
    
    for char in expression:
        if char in '({[':
            stack.push(char)
        elif char in ')}]':
            if stack.is_empty() or stack.pop() != brackets[char]:
                return False
    
    return stack.is_empty()

print(is_balanced("{[()]}")))  # True
print(is_balanced("{[(])}")))  # False`,
    hard: `import heapq
from collections import defaultdict, deque

def dijkstra(graph, start):
    # Initialize distances with infinity for all nodes except start
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    
    # Priority queue to store vertices that need to be processed
    priority_queue = [(0, start)]
    
    # To store the shortest path
    previous = {node: None for node in graph}
    
    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)
        
        # If we've already found a shorter path, skip
        if current_distance > distances[current_node]:
            continue
        
        # Check all neighbors of the current node
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            # If we found a shorter path to the neighbor
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_node
                heapq.heappush(priority_queue, (distance, neighbor))
    
    return distances, previous

def reconstruct_path(previous, start, end):
    path = []
    current = end
    
    while current:
        path.append(current)
        current = previous[current]
    
    # Reverse to get the path from start to end
    path.reverse()
    
    # Check if the path actually starts with the start node
    if path and path[0] == start:
        return path
    return []  # No path exists`
  }
};

export default function CodingTestPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(DIFFICULTY_LEVELS[0]);
  const [selectedDuration, setSelectedDuration] = useState(TEST_DURATIONS[0]);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testText, setTestText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize test text based on selected language and difficulty
  useEffect(() => {
    if (!isTestActive) {
      const text = CODE_SAMPLES[selectedLanguage.id as keyof typeof CODE_SAMPLES][selectedDifficulty.id as 'easy' | 'medium' | 'hard'];
      setTestText(text);
      setUserInput('');
      setCurrentPosition(0);
      setCorrectChars(0);
      setIncorrectChars(0);
      setProgress(0);
    }
  }, [selectedLanguage, selectedDifficulty, isTestActive]);
  
  // Handle timer
  useEffect(() => {
    if (isTestActive && !isTestComplete) {
      setTimeLeft(selectedDuration.seconds);
      
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            endTest();
            return 0;
          }
          return prevTime - 1;
        });
        
        // Update WPM and accuracy every second
        const elapsedMinutes = (Date.now() - startTime) / 60000;
        if (elapsedMinutes > 0) {
          setWpm(calculateWPM(correctChars, elapsedMinutes));
          setAccuracy(calculateAccuracy(correctChars, correctChars + incorrectChars));
        }
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isTestActive, isTestComplete, selectedDuration.seconds]);
  
  // Focus textarea when test starts
  useEffect(() => {
    if (isTestActive && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isTestActive]);
  
  const startTest = () => {
    setIsTestActive(true);
    setIsTestComplete(false);
    setStartTime(Date.now());
    setUserInput('');
    setCurrentPosition(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setProgress(0);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(selectedDuration.seconds);
    setShowSettings(false);
  };
  
  const endTest = () => {
    setIsTestActive(false);
    setIsTestComplete(true);
    setShowResults(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Calculate final stats
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    if (elapsedMinutes > 0) {
      setWpm(calculateWPM(correctChars, elapsedMinutes));
      setAccuracy(calculateAccuracy(correctChars, correctChars + incorrectChars));
    }
  };
  
  const resetTest = () => {
    setIsTestActive(false);
    setIsTestComplete(false);
    setUserInput('');
    setCurrentPosition(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setProgress(0);
    setWpm(0);
    setAccuracy(100);
    setShowResults(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTestActive || isTestComplete) return;
    
    const input = e.target.value;
    setUserInput(input);
    
    // Calculate correct and incorrect characters
    let correct = 0;
    let incorrect = 0;
    
    for (let i = 0; i < input.length; i++) {
      if (i < testText.length) {
        if (input[i] === testText[i]) {
          correct++;
        } else {
          incorrect++;
        }
      }
    }
    
    setCorrectChars(correct);
    setIncorrectChars(incorrect);
    setCurrentPosition(input.length);
    
    // Update progress
    const progressPercentage = (input.length / testText.length) * 100;
    setProgress(progressPercentage > 100 ? 100 : progressPercentage);
    
    // If user completes the test before time runs out
    if (input.length >= testText.length) {
      endTest();
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getPerformanceRating = () => {
    if (wpm >= 80 && accuracy >= 95) return 'Excellent';
    if (wpm >= 60 && accuracy >= 90) return 'Great';
    if (wpm >= 40 && accuracy >= 85) return 'Good';
    if (wpm >= 20 && accuracy >= 80) return 'Fair';
    return 'Needs Practice';
  };
  
  const renderTestText = () => {
    if (!testText) return null;
    
    return (
      <pre className="p-4 rounded-md bg-muted font-mono text-sm max-h-[400px] overflow-y-auto custom-scrollbar whitespace-pre-wrap">
        {testText.split('').map((char, index) => {
          let className = '';
          
          if (index < userInput.length) {
            className = userInput[index] === char ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
          } else if (index === userInput.length) {
            className = 'bg-primary/20 border-b-2 border-primary animate-blink';
          }
          
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </pre>
    );
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Coding Speed Test</h1>
          <p className="text-muted-foreground">
            Test your coding speed and accuracy with real code snippets
          </p>
        </div>
        
        {!isTestActive && !isTestComplete ? (
          <Card>
            <CardHeader>
              <CardTitle>Test Settings</CardTitle>
              <CardDescription>
                Choose your preferred language, difficulty level, and test duration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Programming Language</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {LANGUAGES.map((language) => (
                    <Button
                      key={language.id}
                      variant={selectedLanguage.id === language.id ? 'default' : 'outline'}
                      className="justify-start h-auto py-3"
                      onClick={() => setSelectedLanguage(language)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-xs font-bold">{language.icon.toUpperCase()}</span>
                        </div>
                        <span>{language.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Difficulty Level</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {DIFFICULTY_LEVELS.map((level) => (
                    <Button
                      key={level.id}
                      variant={selectedDifficulty.id === level.id ? 'default' : 'outline'}
                      className="justify-start h-auto py-3"
                      onClick={() => setSelectedDifficulty(level)}
                    >
                      <div className="flex flex-col items-start">
                        <span>{level.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">{level.description}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Test Duration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {TEST_DURATIONS.map((duration) => (
                    <Button
                      key={duration.id}
                      variant={selectedDuration.id === duration.id ? 'default' : 'outline'}
                      className="justify-start"
                      onClick={() => setSelectedDuration(duration)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {duration.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startTest} className="w-full sm:w-auto">
                <Code className="mr-2 h-4 w-4" />
                Start Coding Test
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Coding Test</CardTitle>
                  <CardDescription>
                    {selectedLanguage.name} - {selectedDifficulty.name}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  {isTestActive && (
                    <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={resetTest}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                <div className="flex space-x-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">WPM</span>
                    <span className="font-mono font-bold">{Math.round(wpm)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Accuracy</span>
                    <span className="font-mono font-bold">{Math.round(accuracy)}%</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">Time</span>
                  <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              {renderTestText()}
              
              <textarea
                ref={textareaRef}
                value={userInput}
                onChange={handleInputChange}
                className="w-full h-32 p-4 border rounded-md font-mono text-sm resize-none opacity-0 absolute"
                disabled={!isTestActive || isTestComplete}
                aria-label="Type here"
              />
              
              {!isTestActive && !isTestComplete && (
                <Button onClick={startTest} className="w-full">
                  Start Typing
                </Button>
              )}
              
              {!isTestActive && isTestComplete && (
                <Button onClick={resetTest} className="w-full">
                  Try Again
                </Button>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Improve Your Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Regular practice can significantly improve your coding speed and accuracy.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  Practice with real code snippets
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  Learn keyboard shortcuts
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  Use a code editor with syntax highlighting
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/typing-levels">View Typing Lessons</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Coding Challenges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Take on coding challenges to test your skills in a more complex environment.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  Algorithmic problems
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  Data structure implementations
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  Real-world coding scenarios
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/coding-practice">View Challenges</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Track Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Monitor your improvement over time with detailed statistics.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  WPM and accuracy trends
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  Language-specific performance
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  Identify areas for improvement
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Settings</DialogTitle>
            <DialogDescription>
              Adjust your test settings. This will reset your current test.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Programming Language</h4>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((language) => (
                  <Button
                    key={language.id}
                    variant={selectedLanguage.id === language.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Difficulty Level</h4>
              <div className="grid grid-cols-3 gap-2">
                {DIFFICULTY_LEVELS.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedDifficulty.id === level.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDifficulty(level)}
                  >
                    {level.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Test Duration</h4>
              <div className="grid grid-cols-3 gap-2">
                {TEST_DURATIONS.map((duration) => (
                  <Button
                    key={duration.id}
                    variant={selectedDuration.id === duration.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDuration(duration)}
                  >
                    {duration.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setShowSettings(false);
              resetTest();
            }}>
              Apply and Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Results</DialogTitle>
            <DialogDescription>
              Here's how you performed in your coding test
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold">{getPerformanceRating()}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedLanguage.name} - {selectedDifficulty.name}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold">{Math.round(wpm)}</div>
                <div className="text-xs text-muted-foreground">WPM</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold">{Math.round(accuracy)}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Characters</span>
                <span>{correctChars + incorrectChars}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Correct Characters</span>
                <span className="text-green-500">{correctChars}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Incorrect Characters</span>
                <span className="text-red-500">{incorrectChars}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Completion</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => {
              setShowResults(false);
              resetTest();
            }} className="w-full sm:w-auto">
              Try Again
            </Button>
            <Button onClick={() => {
              setShowResults(false);
              resetTest();
              setShowSettings(true);
            }} className="w-full sm:w-auto">
              Change Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}