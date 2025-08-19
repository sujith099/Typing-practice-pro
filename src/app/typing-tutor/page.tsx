'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Activity, Wind, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Define the levels for the typing tutor
interface Level {
  id: string;
  title: string;
  content: string;
  nextLevelId?: string;
}

const levels: Record<string, Level> = {
  'level-1': {
    id: 'level-1',
    title: 'Level 1 - Getting Started',
    content: 'The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet. Typing practice helps improve both speed and accuracy over time. As you continue to practice, you will notice your fingers naturally finding the right keys without looking.',
    nextLevelId: 'level-2'
  },
  'level-2': {
    id: 'level-2',
    title: 'Level 2 - Building Speed',
    content: 'Practice makes perfect when it comes to typing. The more you type, the faster and more accurate you become. Focus on maintaining a steady rhythm rather than rushing. Quality is more important than speed initially. Remember to keep your fingers on the home row keys.',
    nextLevelId: 'level-3'
  },
  'level-3': {
    id: 'level-3',
    title: 'Level 3 - Advanced Flow',
    content: 'Now we will focus on building your typing flow. Try to maintain a consistent pace without pausing between words. Think of your typing as a continuous stream rather than individual keystrokes. This will help develop your "wind power" - the ability to type smoothly and efficiently.',
    nextLevelId: 'level-4'
  },
  'level-4': {
    id: 'level-4',
    title: 'Level 4 - Initial Practice',
    content: 'This is an initial typing practice paragraph. It contains common words and phrases that you will encounter in everyday typing. The goal is to type this text as accurately and quickly as possible while maintaining a good rhythm. Remember to keep your eyes on the screen and not on your keyboard.',
  }
};

export default function TypingTutorPage() {
  // State for the start screen
  const [isStarted, setIsStarted] = useState(false);
  
  // State for the current level
  const [currentLevelId, setCurrentLevelId] = useState('level-1');
  const [currentLevel, setCurrentLevel] = useState(levels['level-1']);
  
  // State for the typing test
  const [userInput, setUserInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Metrics
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [windPower, setWindPower] = useState(0);
  
  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const lastInputTimeRef = useRef<number | null>(null);
  const typingIntervalsRef = useRef<number[]>([]);
  
  // Initialize the current level
  useEffect(() => {
    setCurrentLevel(levels[currentLevelId]);
    resetTest();
  }, [currentLevelId]);
  
  // Start timer when user starts typing
  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      const now = Date.now();
      setStartTime(now);
      lastInputTimeRef.current = now;
    }
    
    if (startTime && userInput.length > 0) {
      // Calculate typing interval for wind power
      const now = Date.now();
      if (lastInputTimeRef.current) {
        const interval = now - lastInputTimeRef.current;
        typingIntervalsRef.current.push(interval);
        
        // Only keep the last 20 intervals for a moving average
        if (typingIntervalsRef.current.length > 20) {
          typingIntervalsRef.current.shift();
        }
      }
      lastInputTimeRef.current = now;
      
      // Calculate metrics
      calculateMetrics();
      
      // Check if test is complete
      if (userInput.length === currentLevel.content.length) {
        completeTest();
      }
    }
  }, [userInput, startTime, currentLevel.content.length]);
  
  // Timer for elapsed time
  useEffect(() => {
    if (startTime && !isComplete) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime, isComplete]);
  
  // Calculate WPM, accuracy, and wind power
  const calculateMetrics = () => {
    if (!startTime) return;
    
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    if (elapsedMinutes > 0) {
      // Calculate WPM (standard formula: characters typed / 5 / minutes elapsed)
      const words = userInput.length / 5;
      const currentWpm = Math.round(words / elapsedMinutes);
      setWpm(currentWpm);
      
      // Calculate accuracy
      let correctChars = 0;
      const targetText = currentLevel.content.substring(0, userInput.length);
      
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === targetText[i]) {
          correctChars++;
        }
      }
      
      const currentAccuracy = Math.round((correctChars / userInput.length) * 100);
      setAccuracy(currentAccuracy);
      
      // Calculate wind power (a combination of typing consistency and speed)
      // Wind power increases with consistent typing rhythm and decreases with pauses
      if (typingIntervalsRef.current.length > 5) {
        const avgInterval = typingIntervalsRef.current.reduce((sum, interval) => sum + interval, 0) / typingIntervalsRef.current.length;
        
        // Calculate standard deviation to measure consistency
        const variance = typingIntervalsRef.current.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / typingIntervalsRef.current.length;
        const stdDev = Math.sqrt(variance);
        
        // Wind power formula: (WPM * Accuracy%) / (Standard Deviation of Typing Intervals)
        // Normalize to a 0-100 scale
        const consistencyFactor = Math.max(1, Math.min(stdDev / 50, 10));
        const rawWindPower = (currentWpm * (currentAccuracy / 100)) / consistencyFactor;
        
        // Scale to 0-100
        const scaledWindPower = Math.min(100, Math.max(0, Math.round(rawWindPower)));
        setWindPower(scaledWindPower);
      }
    }
  };
  
  // Start the test
  const startTest = () => {
    setIsStarted(true);
    resetTest();
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };
  
  // Reset the test
  const resetTest = () => {
    setUserInput('');
    setIsComplete(false);
    setStartTime(null);
    setElapsedTime(0);
    setWpm(0);
    setAccuracy(100);
    setWindPower(0);
    typingIntervalsRef.current = [];
    lastInputTimeRef.current = null;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  
  // Complete the test
  const completeTest = () => {
    setIsComplete(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    calculateMetrics();
  };
  
  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);
  };
  
  // Move to the next level
  const goToNextLevel = () => {
    if (currentLevel.nextLevelId) {
      setCurrentLevelId(currentLevel.nextLevelId);
    }
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (currentLevel.content.length === 0) return 0;
    return (userInput.length / currentLevel.content.length) * 100;
  };
  
  // Get performance rating
  const getPerformanceRating = () => {
    if (wpm >= 60 && accuracy >= 95 && windPower >= 80) return 'Excellent';
    if (wpm >= 40 && accuracy >= 90 && windPower >= 60) return 'Good';
    if (wpm >= 20 && accuracy >= 85 && windPower >= 40) return 'Average';
    return 'Needs Practice';
  };
  
  // Get wind power description
  const getWindPowerDescription = () => {
    if (windPower >= 80) return 'Hurricane Force';
    if (windPower >= 60) return 'Strong Breeze';
    if (windPower >= 40) return 'Moderate Breeze';
    if (windPower >= 20) return 'Light Breeze';
    return 'Calm';
  };
  
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
            <span>Typing Tutor</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Typing Tutor</h1>
          <p className="text-muted-foreground">
            Improve your typing speed, accuracy, and flow with our interactive typing tutor.
          </p>
        </div>
        
        {!isStarted ? (
          // Start Screen
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Welcome to the Typing Tutor</CardTitle>
              <CardDescription>
                This tutor will help you improve your typing skills by tracking your speed, accuracy, and wind power.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">What is Wind Power?</h3>
                <p className="text-muted-foreground">
                  Wind Power is a unique metric that measures your typing flow and consistency. 
                  It combines your typing speed, accuracy, and rhythm to give you a holistic view of your typing efficiency.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">How it Works</h3>
                <p className="text-muted-foreground">
                  1. Start typing the text shown on the screen.<br />
                  2. Your speed (WPM), accuracy, and wind power will be calculated in real-time.<br />
                  3. Complete the text to see your final results and progress to the next level.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startTest} className="w-full">
                Start Typing Test
              </Button>
            </CardFooter>
          </Card>
        ) : (
          // Typing Test Screen
          <div className="space-y-6">
            {/* Level information */}
            <Card>
              <CardHeader>
                <CardTitle>{currentLevel.title}</CardTitle>
              </CardHeader>
            </Card>
            
            {/* Metrics display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Speed</span>
                    </div>
                    <span className="text-2xl font-bold">{wpm}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Words Per Minute</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Accuracy</span>
                    </div>
                    <span className="text-2xl font-bold">{accuracy}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Percentage Correct</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wind className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Wind Power</span>
                    </div>
                    <span className="text-2xl font-bold">{windPower}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{getWindPowerDescription()}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Timer and progress */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formatTime(elapsedTime)}</span>
              </div>
              <span className="text-sm px-2 py-1 border rounded-md">
                {isComplete ? 'Completed' : `${Math.floor(getProgressPercentage())}%`}
              </span>
            </div>
            
            {/* Progress bar */}
            <Progress value={getProgressPercentage()} className="h-2" />
            
            {/* Typing area */}
            {!isComplete ? (
              <div className="space-y-4">
                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      <p className="text-lg leading-relaxed">
                        {currentLevel.content.split('').map((char, index) => {
                          let className = '';
                          
                          if (index < userInput.length) {
                            // Character has been typed
                            className = userInput[index] === char ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
                          } else if (index === userInput.length) {
                            // Current character to type
                            className = 'bg-primary/20 border-b-2 border-primary animate-blink';
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
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  className="w-full h-32 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Start typing here..."
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            ) : (
              // Results summary
              <Card>
                <CardHeader>
                  <CardTitle>Test Results</CardTitle>
                  <CardDescription>
                    Here's how you performed on this typing test.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-3xl font-bold">{wpm}</span>
                      <span className="text-sm text-muted-foreground">WPM</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-3xl font-bold">{accuracy}%</span>
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-3xl font-bold">{windPower}</span>
                      <span className="text-sm text-muted-foreground">Wind Power</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-3xl font-bold">{formatTime(elapsedTime)}</span>
                      <span className="text-sm text-muted-foreground">Time</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Performance Rating</span>
                      <span className="font-bold">{getPerformanceRating()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Wind Power: {getWindPowerDescription()} - Your typing has {windPower >= 60 ? 'excellent' : windPower >= 40 ? 'good' : 'developing'} flow and consistency.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetTest}>
                    Try Again
                  </Button>
                  
                  {currentLevel.nextLevelId && (
                    <Button onClick={goToNextLevel}>
                      Next Level
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}