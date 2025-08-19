'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, RotateCcw, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateAccuracy, calculateWPM } from '@/lib/utils';

// Sample texts for typing test
const sampleTexts = {
  short: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  medium: "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++. Created by Brendan Eich of Netscape initially as Mocha, then LiveScript, and finally renamed to JavaScript, the language has evolved significantly since its first appearance in 1995.",
  long: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds additional syntax to JavaScript to support a tighter integration with your editor. Catch errors early in your editor. TypeScript code converts to JavaScript, which runs anywhere JavaScript runs: In a browser, on Node.js or Deno and in your apps. TypeScript understands JavaScript and uses type inference to give you great tooling without additional code. The TypeScript compiler is written in TypeScript and can be used as a service, enabling rich IDE experiences."
};

// Test durations in seconds
const testDurations = {
  '1min': 60,
  '2min': 120,
  '5min': 300
};

type TestLength = 'short' | 'medium' | 'long';
type TestDuration = '1min' | '2min' | '5min';

export default function TypingTestPage() {
  // Test configuration
  const [textLength, setTextLength] = useState<TestLength>('medium');
  const [duration, setDuration] = useState<TestDuration>('1min');
  const [showSettings, setShowSettings] = useState(false);
  
  // Test state
  const [text, setText] = useState(sampleTexts[textLength]);
  const [userInput, setUserInput] = useState('');
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(testDurations[duration]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [showResults, setShowResults] = useState(false);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  // Initialize test
  useEffect(() => {
    setText(sampleTexts[textLength]);
    setTimeLeft(testDurations[duration]);
    resetTest();
  }, [textLength, duration]);

  // Start timer when user starts typing
  useEffect(() => {
    if (userInput.length === 1 && !isTestActive && !isTestComplete) {
      startTest();
    }
  }, [userInput, isTestActive, isTestComplete]);

  // Timer countdown
  useEffect(() => {
    if (isTestActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isTestActive && timeLeft === 0) {
      endTest();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTestActive, timeLeft]);

  // Calculate WPM and accuracy in real-time
  useEffect(() => {
    if (isTestActive && startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      if (elapsedMinutes > 0) {
        // Calculate WPM
        const currentWpm = calculateWPM(userInput.length, elapsedMinutes);
        setWpm(Math.round(currentWpm));

        // Calculate accuracy
        const targetText = text.substring(0, userInput.length);
        const currentAccuracy = calculateAccuracy(targetText, userInput);
        setAccuracy(currentAccuracy);

        // Check if test is completed by typing all text
        if (userInput.length === text.length) {
          endTest();
        }
      }
    }
  }, [userInput, isTestActive, startTime, text]);

  // Start the test
  const startTest = () => {
    setIsTestActive(true);
    setStartTime(Date.now());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // End the test
  const endTest = () => {
    setIsTestActive(false);
    setIsTestComplete(true);
    setShowResults(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Reset the test
  const resetTest = () => {
    setUserInput('');
    setIsTestActive(false);
    setIsTestComplete(false);
    setStartTime(null);
    setTimeLeft(testDurations[duration]);
    setWpm(0);
    setAccuracy(100);
    setShowResults(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTestComplete) {
      setUserInput(e.target.value);
    }
  };

  // Format time left
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format the text with highlighting for typed characters
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = '';
      
      if (index < userInput.length) {
        // Character has been typed
        className = userInput[index] === char ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      } else if (index === userInput.length) {
        // Current character to type
        className = 'bg-primary/20 border-b-2 border-primary animate-pulse';
      }
      
      // Handle special characters
      if (char === ' ') {
        return <span key={index} className={`${className} inline-block w-[0.25em]`}>&nbsp;</span>;
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  // Calculate progress percentage
  const progressPercentage = Math.floor((userInput.length / text.length) * 100);

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        {/* Header with navigation */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Typing Test</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Typing Speed Test</h1>
          <p className="text-muted-foreground">
            Test your typing speed and accuracy. Start typing to begin the test.
          </p>
        </div>

        {/* Test controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1 rounded-md">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatTimeLeft()}</span>
          </div>
          <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1 rounded-md">
            <span className="text-sm font-medium">WPM:</span>
            <span className="text-sm">{wpm}</span>
          </div>
          <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1 rounded-md">
            <span className="text-sm font-medium">Accuracy:</span>
            <span className="text-sm">{accuracy}%</span>
          </div>
          <div className="flex-grow"></div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowSettings(true)}
              disabled={isTestActive}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetTest}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <Progress value={progressPercentage} className="h-2" />

        {/* Typing area */}
        <div className="relative">
          <Card>
            <CardContent className="p-6">
              <div 
                className="font-mono text-lg whitespace-pre-wrap leading-relaxed bg-muted/30 rounded-md p-6 min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar cursor-text"
                onClick={() => inputRef.current?.focus()}
              >
                {renderText()}
              </div>
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text resize-none outline-none"
                aria-label="Type the text here"
                disabled={isTestComplete}
                placeholder="Start typing to begin the test"
                autoFocus
              />
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        {!isTestActive && !isTestComplete && (
          <div className="text-center text-muted-foreground">
            <p>Click in the text area and start typing to begin the test.</p>
            <p>The timer will start automatically when you begin typing.</p>
          </div>
        )}

        {/* Settings dialog */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Settings</DialogTitle>
              <DialogDescription>
                Customize your typing test experience.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Text Length</h3>
                <Tabs 
                  defaultValue={textLength} 
                  onValueChange={(value) => setTextLength(value as TestLength)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="short">Short</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="long">Long</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Test Duration</h3>
                <Tabs 
                  defaultValue={duration} 
                  onValueChange={(value) => setDuration(value as TestDuration)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="1min">1 Minute</TabsTrigger>
                    <TabsTrigger value="2min">2 Minutes</TabsTrigger>
                    <TabsTrigger value="5min">5 Minutes</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSettings(false)}>Apply Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Results dialog */}
        <Dialog open={showResults} onOpenChange={setShowResults}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Results</DialogTitle>
              <DialogDescription>
                Here's how you performed on the typing test.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                <span className="text-3xl font-bold">{wpm}</span>
                <span className="text-sm text-muted-foreground">Words Per Minute</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                <span className="text-3xl font-bold">{accuracy}%</span>
                <span className="text-sm text-muted-foreground">Accuracy</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                <span className="text-3xl font-bold">{Math.round(userInput.length / 5)}</span>
                <span className="text-sm text-muted-foreground">Words Typed</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                <span className="text-3xl font-bold">{testDurations[duration] - timeLeft}s</span>
                <span className="text-sm text-muted-foreground">Time Spent</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Performance Rating</h3>
              <div className="p-3 rounded-md bg-muted/30">
                <p className="text-center font-medium">
                  {wpm < 30 ? 'Beginner' : 
                   wpm < 50 ? 'Average' : 
                   wpm < 70 ? 'Good' : 
                   wpm < 90 ? 'Excellent' : 'Professional'}
                </p>
                <Progress 
                  value={Math.min(wpm, 100)} 
                  className="h-2 mt-2" 
                />
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={resetTest}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={() => setShowResults(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}