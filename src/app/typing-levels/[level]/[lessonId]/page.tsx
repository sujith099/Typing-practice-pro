'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Award, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateWPM, calculateAccuracy } from '@/lib/utils';

interface LessonType {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  content: string;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const level = params.level as string;
  const lessonId = params.lessonId as string;
  
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
  
  // Mock data for different levels and lessons
  const lessonData: Record<string, Record<string, LessonType>> = {
    beginner: {
      // Home Row Keys - 30 levels
      'home-row-1': {
        id: 'home-row-1',
        title: 'Home Row Keys - Level 1',
        description: 'Learn the home row keys: A, S, D, F',
        difficulty: 'easy',
        estimatedTime: '3 min',
        content: 'aaaa ssss dddd ffff aaaa ssss dddd ffff'
      },
      'home-row-2': {
        id: 'home-row-2',
        title: 'Home Row Keys - Level 2',
        description: 'Learn the home row keys: J, K, L, ;',
        difficulty: 'easy',
        estimatedTime: '3 min',
        content: 'jjjj kkkk llll ;;;; jjjj kkkk llll ;;;;'
      },
      'home-row-3': {
        id: 'home-row-3',
        title: 'Home Row Keys - Level 3',
        description: 'Combine left home row keys: A, S, D, F',
        difficulty: 'easy',
        estimatedTime: '4 min',
        content: 'asdf asdf asdf asdf fdsa fdsa fdsa fdsa'
      },
      'home-row-4': {
        id: 'home-row-4',
        title: 'Home Row Keys - Level 4',
        description: 'Combine right home row keys: J, K, L, ;',
        difficulty: 'easy',
        estimatedTime: '4 min',
        content: 'jkl; jkl; jkl; jkl; ;lkj ;lkj ;lkj ;lkj'
      },
      'home-row-5': {
        id: 'home-row-5',
        title: 'Home Row Keys - Level 5',
        description: 'Combine all home row keys',
        difficulty: 'easy',
        estimatedTime: '5 min',
        content: 'asdf jkl; asdf jkl; fjdk slal djas flak jdsa l;ak'
      },
      'home-row-6': {
        id: 'home-row-6',
        title: 'Home Row Keys - Level 6',
        description: 'Practice words using home row keys',
        difficulty: 'easy',
        estimatedTime: '5 min',
        content: 'as dad fad sad lad jak lal fall salad'
      },
      'home-row-7': {
        id: 'home-row-7',
        title: 'Home Row Keys - Level 7',
        description: 'More words using home row keys',
        difficulty: 'easy',
        estimatedTime: '5 min',
        content: 'ask flask salsa jalal alaska dasal'
      },
      'home-row-8': {
        id: 'home-row-8',
        title: 'Home Row Keys - Level 8',
        description: 'Short sentences with home row keys',
        difficulty: 'medium',
        estimatedTime: '6 min',
        content: 'a lad asks dad; a sad lad; a flask falls; a salad'
      },
      'home-row-9': {
        id: 'home-row-9',
        title: 'Home Row Keys - Level 9',
        description: 'Longer sentences with home row keys',
        difficulty: 'medium',
        estimatedTime: '6 min',
        content: 'dad asks a lad; a salad as a salsa; a flask falls as a lad asks'
      },
      'home-row-10': {
        id: 'home-row-10',
        title: 'Home Row Keys - Level 10',
        description: 'Speed practice with home row keys',
        difficulty: 'medium',
        estimatedTime: '7 min',
        content: 'asdf jkl; asdf jkl; fjdk slal djas flak jdsa l;ak asdf jkl;'
      },
      'home-row-11': {
        id: 'home-row-11',
        title: 'Home Row Keys - Level 11',
        description: 'Alternating fingers practice',
        difficulty: 'medium',
        estimatedTime: '5 min',
        content: 'aj sk dl f; aj sk dl f; aj sk dl f; aj sk dl f;'
      },
      'home-row-12': {
        id: 'home-row-12',
        title: 'Home Row Keys - Level 12',
        description: 'Double letter practice',
        difficulty: 'medium',
        estimatedTime: '5 min',
        content: 'aass ddjj ffkk ll;; aass ddjj ffkk ll;;'
      },
      'home-row-13': {
        id: 'home-row-13',
        title: 'Home Row Keys - Level 13',
        description: 'Triple letter practice',
        difficulty: 'medium',
        estimatedTime: '5 min',
        content: 'aaasss dddjjj fffkkk lll;;; aaasss dddjjj'
      },
      'home-row-14': {
        id: 'home-row-14',
        title: 'Home Row Keys - Level 14',
        description: 'Rhythm practice',
        difficulty: 'medium',
        estimatedTime: '6 min',
        content: 'aj aj aj sk sk sk dl dl dl f; f; f; ajsk dlf;'
      },
      'home-row-15': {
        id: 'home-row-15',
        title: 'Home Row Keys - Level 15',
        description: 'Speed challenge',
        difficulty: 'medium',
        estimatedTime: '7 min',
        content: 'asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl;'
      },
      'home-row-16': {
        id: 'home-row-16',
        title: 'Home Row Keys - Level 16',
        description: 'Accuracy challenge',
        difficulty: 'medium',
        estimatedTime: '7 min',
        content: 'aaa sss ddd fff jjj kkk lll ;;; asdfjkl;'
      },
      'home-row-17': {
        id: 'home-row-17',
        title: 'Home Row Keys - Level 17',
        description: 'Word combinations',
        difficulty: 'medium',
        estimatedTime: '8 min',
        content: 'all fall sad lad dad fad jak ask flask'
      },
      'home-row-18': {
        id: 'home-row-18',
        title: 'Home Row Keys - Level 18',
        description: 'Sentence practice',
        difficulty: 'hard',
        estimatedTime: '8 min',
        content: 'a sad lad asks dad; all fall as a flask falls; a salad'
      },
      'home-row-19': {
        id: 'home-row-19',
        title: 'Home Row Keys - Level 19',
        description: 'Advanced word combinations',
        difficulty: 'hard',
        estimatedTime: '8 min',
        content: 'salsa flask alaska dallas salad falafel'
      },
      'home-row-20': {
        id: 'home-row-20',
        title: 'Home Row Keys - Level 20',
        description: 'Advanced sentence practice',
        difficulty: 'hard',
        estimatedTime: '9 min',
        content: 'a lad asks dad for a salad; a flask falls as all ask; a salsa'
      },
      'home-row-21': {
        id: 'home-row-21',
        title: 'Home Row Keys - Level 21',
        description: 'Speed and accuracy balance',
        difficulty: 'hard',
        estimatedTime: '9 min',
        content: 'asdf jkl; asdf jkl; fjdk slal djas flak jdsa l;ak asdf jkl;'
      },
      'home-row-22': {
        id: 'home-row-22',
        title: 'Home Row Keys - Level 22',
        description: 'Finger independence practice',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'af af af sj sj sj dk dk dk l; l; l; afsjdkl;'
      },
      'home-row-23': {
        id: 'home-row-23',
        title: 'Home Row Keys - Level 23',
        description: 'Advanced finger patterns',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'afs jdkl afs jdkl afs jdkl afs jdkl afs jdkl'
      },
      'home-row-24': {
        id: 'home-row-24',
        title: 'Home Row Keys - Level 24',
        description: 'Complex word patterns',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'flask salad alaska dallas falafel salsa'
      },
      'home-row-25': {
        id: 'home-row-25',
        title: 'Home Row Keys - Level 25',
        description: 'Complex sentence patterns',
        difficulty: 'hard',
        estimatedTime: '11 min',
        content: 'a lad asks dad for a salad; a flask falls as all ask; a salsa'
      },
      'home-row-26': {
        id: 'home-row-26',
        title: 'Home Row Keys - Level 26',
        description: 'Speed challenge advanced',
        difficulty: 'hard',
        estimatedTime: '11 min',
        content: 'asdf jkl; fjdk slal djas flak jdsa l;ak asdf jkl; fjdk slal'
      },
      'home-row-27': {
        id: 'home-row-27',
        title: 'Home Row Keys - Level 27',
        description: 'Accuracy challenge advanced',
        difficulty: 'hard',
        estimatedTime: '12 min',
        content: 'asdfjkl; asdfjkl; asdfjkl; asdfjkl; asdfjkl; asdfjkl;'
      },
      'home-row-28': {
        id: 'home-row-28',
        title: 'Home Row Keys - Level 28',
        description: 'Endurance practice',
        difficulty: 'hard',
        estimatedTime: '12 min',
        content: 'asdf jkl; asdf jkl; fjdk slal djas flak jdsa l;ak asdf jkl; fjdk slal djas flak jdsa l;ak'
      },
      'home-row-29': {
        id: 'home-row-29',
        title: 'Home Row Keys - Level 29',
        description: 'Master challenge',
        difficulty: 'hard',
        estimatedTime: '13 min',
        content: 'a sad lad asks dad; all fall as a flask falls; a salad as a salsa; a flask falls as a lad asks'
      },
      'home-row-30': {
        id: 'home-row-30',
        title: 'Home Row Keys - Level 30',
        description: 'Home row mastery test',
        difficulty: 'hard',
        estimatedTime: '15 min',
        content: 'asdf jkl; fjdk slal djas flak jdsa l;ak a sad lad asks dad; all fall as a flask falls; a salad as a salsa; a flask falls as a lad asks'
      },
      
      // Top Row Keys - 30 levels
      'top-row-1': {
        id: 'top-row-1',
        title: 'Top Row Keys - Level 1',
        description: 'Learn the left top row keys: Q, W, E, R, T',
        difficulty: 'easy',
        estimatedTime: '3 min',
        content: 'qqqq wwww eeee rrrr tttt qqqq wwww eeee rrrr tttt'
      },
      'top-row-2': {
        id: 'top-row-2',
        title: 'Top Row Keys - Level 2',
        description: 'Learn the right top row keys: Y, U, I, O, P',
        difficulty: 'easy',
        estimatedTime: '3 min',
        content: 'yyyy uuuu iiii oooo pppp yyyy uuuu iiii oooo pppp'
      },
      'top-row-3': {
        id: 'top-row-3',
        title: 'Top Row Keys - Level 3',
        description: 'Combine left top row keys',
        difficulty: 'easy',
        estimatedTime: '4 min',
        content: 'qwert qwert qwert qwert trewq trewq trewq trewq'
      },
      'top-row-4': {
        id: 'top-row-4',
        title: 'Top Row Keys - Level 4',
        description: 'Combine right top row keys',
        difficulty: 'easy',
        estimatedTime: '4 min',
        content: 'yuiop yuiop yuiop yuiop poiuy poiuy poiuy poiuy'
      },
      'top-row-5': {
        id: 'top-row-5',
        title: 'Top Row Keys - Level 5',
        description: 'Combine all top row keys',
        difficulty: 'easy',
        estimatedTime: '5 min',
        content: 'qwert yuiop qwert yuiop qwer tyui opqw erty uiop'
      },
      'top-row-6': {
        id: 'top-row-6',
        title: 'Top Row Keys - Level 6',
        description: 'Practice words using top row keys',
        difficulty: 'easy',
        estimatedTime: '5 min',
        content: 'we type quiet power you it to we type quiet power'
      },
      'top-row-7': {
        id: 'top-row-7',
        title: 'Top Row Keys - Level 7',
        description: 'More words using top row keys',
        difficulty: 'easy',
        estimatedTime: '5 min',
        content: 'quit write type rope your pit wet quit write type'
      },
      'top-row-8': {
        id: 'top-row-8',
        title: 'Top Row Keys - Level 8',
        description: 'Short sentences with top row keys',
        difficulty: 'medium',
        estimatedTime: '6 min',
        content: 'we type; you write; quiet power; it to you; we type'
      },
      'top-row-9': {
        id: 'top-row-9',
        title: 'Top Row Keys - Level 9',
        description: 'Longer sentences with top row keys',
        difficulty: 'medium',
        estimatedTime: '6 min',
        content: 'we type to you; write your power; it is quiet to type'
      },
      'top-row-10': {
        id: 'top-row-10',
        title: 'Top Row Keys - Level 10',
        description: 'Speed practice with top row keys',
        difficulty: 'medium',
        estimatedTime: '7 min',
        content: 'qwert yuiop qwert yuiop qwer tyui opqw erty uiop qwert yuiop'
      },
      'top-row-11': {
        id: 'top-row-11',
        title: 'Top Row Keys - Level 11',
        description: 'Alternating fingers practice',
        difficulty: 'medium',
        estimatedTime: '5 min',
        content: 'qy we rt ui op qy we rt ui op qy we rt ui op'
      },
      'top-row-12': {
        id: 'top-row-12',
        title: 'Top Row Keys - Level 12',
        description: 'Double letter practice',
        difficulty: 'medium',
        estimatedTime: '5 min',
        content: 'qqww eerr ttyy uuii oopp qqww eerr ttyy uuii oopp'
      },
      'top-row-13': {
        id: 'top-row-13',
        title: 'Top Row Keys - Level 13',
        description: 'Triple letter practice',
        difficulty: 'medium',
        estimatedTime: '5 min',
        content: 'qqqwww eeerrr tttuuu iiiooo ppp qqqwww eeerrr'
      },
      'top-row-14': {
        id: 'top-row-14',
        title: 'Top Row Keys - Level 14',
        description: 'Rhythm practice',
        difficulty: 'medium',
        estimatedTime: '6 min',
        content: 'qy qy qy we we we rt rt rt ui ui ui op op op qywertui'
      },
      'top-row-15': {
        id: 'top-row-15',
        title: 'Top Row Keys - Level 15',
        description: 'Speed challenge',
        difficulty: 'medium',
        estimatedTime: '7 min',
        content: 'qwert yuiop qwert yuiop qwert yuiop qwert yuiop qwert yuiop'
      },
      'top-row-16': {
        id: 'top-row-16',
        title: 'Top Row Keys - Level 16',
        description: 'Accuracy challenge',
        difficulty: 'medium',
        estimatedTime: '7 min',
        content: 'qqq www eee rrr ttt yyy uuu iii ooo ppp qwertyuiop'
      },
      'top-row-17': {
        id: 'top-row-17',
        title: 'Top Row Keys - Level 17',
        description: 'Word combinations',
        difficulty: 'medium',
        estimatedTime: '8 min',
        content: 'type write quit power your it to we type write quit'
      },
      'top-row-18': {
        id: 'top-row-18',
        title: 'Top Row Keys - Level 18',
        description: 'Sentence practice',
        difficulty: 'hard',
        estimatedTime: '8 min',
        content: 'we type to you; write your power; it is quiet to type; we write'
      },
      'top-row-19': {
        id: 'top-row-19',
        title: 'Top Row Keys - Level 19',
        description: 'Advanced word combinations',
        difficulty: 'hard',
        estimatedTime: '8 min',
        content: 'typewriter quieter power your write type quit'
      },
      'top-row-20': {
        id: 'top-row-20',
        title: 'Top Row Keys - Level 20',
        description: 'Advanced sentence practice',
        difficulty: 'hard',
        estimatedTime: '9 min',
        content: 'we type to you quietly; write your power type; it is quiet to type'
      },
      'top-row-21': {
        id: 'top-row-21',
        title: 'Top Row Keys - Level 21',
        description: 'Speed and accuracy balance',
        difficulty: 'hard',
        estimatedTime: '9 min',
        content: 'qwert yuiop qwert yuiop qwer tyui opqw erty uiop qwert yuiop'
      },
      'top-row-22': {
        id: 'top-row-22',
        title: 'Top Row Keys - Level 22',
        description: 'Finger independence practice',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'qp qp qp we we we rt rt rt ui ui ui qpwertui'
      },
      'top-row-23': {
        id: 'top-row-23',
        title: 'Top Row Keys - Level 23',
        description: 'Advanced finger patterns',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'qwer tyuio qwer tyuio qwer tyuio qwer tyuio qwer tyuio'
      },
      'top-row-24': {
        id: 'top-row-24',
        title: 'Top Row Keys - Level 24',
        description: 'Complex word patterns',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'typewriter quieter power your write type quit typewriter'
      },
      'top-row-25': {
        id: 'top-row-25',
        title: 'Top Row Keys - Level 25',
        description: 'Complex sentence patterns',
        difficulty: 'hard',
        estimatedTime: '11 min',
        content: 'we type to you quietly; write your power type; it is quiet to type'
      },
      'top-row-26': {
        id: 'top-row-26',
        title: 'Top Row Keys - Level 26',
        description: 'Speed challenge advanced',
        difficulty: 'hard',
        estimatedTime: '11 min',
        content: 'qwert yuiop qwer tyui opqw erty uiop qwert yuiop qwer tyui opqw'
      },
      'top-row-27': {
        id: 'top-row-27',
        title: 'Top Row Keys - Level 27',
        description: 'Accuracy challenge advanced',
        difficulty: 'hard',
        estimatedTime: '12 min',
        content: 'qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop'
      },
      'top-row-28': {
        id: 'top-row-28',
        title: 'Top Row Keys - Level 28',
        description: 'Endurance practice',
        difficulty: 'hard',
        estimatedTime: '12 min',
        content: 'qwert yuiop qwert yuiop qwer tyui opqw erty uiop qwert yuiop qwer tyui opqw erty uiop'
      },
      'top-row-29': {
        id: 'top-row-29',
        title: 'Top Row Keys - Level 29',
        description: 'Master challenge',
        difficulty: 'hard',
        estimatedTime: '13 min',
        content: 'we type to you quietly; write your power type; it is quiet to type; we write to you; type your quiet power'
      },
      'top-row-30': {
        id: 'top-row-30',
        title: 'Top Row Keys - Level 30',
        description: 'Top row mastery test',
        difficulty: 'hard',
        estimatedTime: '15 min',
        content: 'qwert yuiop qwer tyui opqw erty uiop we type to you quietly; write your power type; it is quiet to type; we write to you; type your quiet power'
      },
      
      // Bottom Row Keys - 30 levels
      'bottom-row-1': {
        id: 'bottom-row-1',
        title: 'Bottom Row Keys - Level 1',
        description: 'Learn the left bottom row keys: Z, X, C, V',
        difficulty: 'easy',
        estimatedTime: '3 min',
        content: 'zzzz xxxx cccc vvvv zzzz xxxx cccc vvvv'
      },
      'bottom-row-2': {
        id: 'bottom-row-2',
        title: 'Bottom Row Keys - Level 2',
        description: 'Learn the right bottom row keys: B, N, M',
        difficulty: 'easy',
        estimatedTime: '3 min',
        content: 'bbbb nnnn mmmm bbbb nnnn mmmm bbbb nnnn mmmm'
      },
      'bottom-row-3': {
        id: 'bottom-row-3',
        title: 'Bottom Row Keys - Level 3',
        description: 'Combine left bottom row keys',
        difficulty: 'easy',
        estimatedTime: '4 min',
        content: 'zxcv zxcv zxcv zxcv vcxz vcxz vcxz vcxz'
      },
      'bottom-row-4': {
        id: 'bottom-row-4',
        title: 'Bottom Row Keys - Level 4',
        description: 'Combine right bottom row keys',
        difficulty: 'easy',
        estimatedTime: '4 min',
        content: 'bnm, bnm, bnm, bnm, ,mnb ,mnb ,mnb ,mnb'
      },
      'bottom-row-5': {
        id: 'bottom-row-5',
        title: 'Bottom Row Keys - Level 5',
        description: 'Combine all bottom row keys',
        difficulty: 'easy',
        estimatedTime: '5 min',
        content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
      },
      'bottom-row-6': {
        id: 'bottom-row-6',
        title: 'Bottom Row Keys - Level 6',
        description: 'Practice words using bottom row keys',
        difficulty: 'easy',
        estimatedTime: '5 min',
        content: 'mix viz cab van max mix viz cab van max'
      },
      'bottom-row-7': {
        id: 'bottom-row-7',
        title: 'Bottom Row Keys - Level 7',
        description: 'More words using bottom row keys',
        difficulty: 'easy',
        estimatedTime: '5 min',
        content: 'zinc vex cab numb mix zinc vex cab numb mix'
      },
      'bottom-row-8': {
        id: 'bottom-row-8',
        title: 'Bottom Row Keys - Level 8',
        description: 'Short sentences with bottom row keys',
        difficulty: 'medium',
        estimatedTime: '6 min',
        content: 'mix cab; viz van; max numb; mix cab; viz van'
      },
      'bottom-row-9': {
        id: 'bottom-row-9',
        title: 'Bottom Row Keys - Level 9',
        description: 'Longer sentences with bottom row keys',
        difficulty: 'medium',
        estimatedTime: '6 min',
        content: 'mix a cab; viz a van; max a numb; mix a cab; viz a van'
      },
      'bottom-row-10': {
        id: 'bottom-row-10',
        title: 'Bottom Row Keys - Level 10',
        description: 'Speed practice with bottom row keys',
        difficulty: 'medium',
        estimatedTime: '7 min',
        content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
      },
      'bottom-row-11': {
        id: 'bottom-row-11',
        title: 'Bottom Row Keys - Level 11',
        description: 'Alternating fingers practice',
        difficulty: 'medium',
        estimatedTime: '5 min',
        content: 'zb xn cm v, zb xn cm v, zb xn cm v, zb xn cm v,'
      },
      'bottom-row-12': {
        id: 'bottom-row-12',
        title: 'Bottom Row Keys - Level 12',
        description: 'Double letter practice',
        difficulty: 'medium',
        estimatedTime: '5 min',
        content: 'zzxx ccvv bbnn mm,, zzxx ccvv bbnn mm,,'
      },
      'bottom-row-13': {
        id: 'bottom-row-13',
        title: 'Bottom Row Keys - Level 13',
        description: 'Triple letter practice',
        difficulty: 'medium',
        estimatedTime: '5 min',
        content: 'zzzxxx cccvvv bbbnnn mmm,,, zzzxxx cccvvv'
      },
      'bottom-row-14': {
        id: 'bottom-row-14',
        title: 'Bottom Row Keys - Level 14',
        description: 'Rhythm practice',
        difficulty: 'medium',
        estimatedTime: '6 min',
        content: 'zb zb zb xn xn xn cm cm cm v, v, v, zbxncmv,'
      },
      'bottom-row-15': {
        id: 'bottom-row-15',
        title: 'Bottom Row Keys - Level 15',
        description: 'Speed challenge',
        difficulty: 'medium',
        estimatedTime: '7 min',
        content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
      },
      'bottom-row-16': {
        id: 'bottom-row-16',
        title: 'Bottom Row Keys - Level 16',
        description: 'Accuracy challenge',
        difficulty: 'medium',
        estimatedTime: '7 min',
        content: 'zzz xxx ccc vvv bbb nnn mmm ,,, zxcvbnm,'
      },
      'bottom-row-17': {
        id: 'bottom-row-17',
        title: 'Bottom Row Keys - Level 17',
        description: 'Word combinations',
        difficulty: 'medium',
        estimatedTime: '8 min',
        content: 'mix viz cab van max numb zinc vex mix viz'
      },
      'bottom-row-18': {
        id: 'bottom-row-18',
        title: 'Bottom Row Keys - Level 18',
        description: 'Sentence practice',
        difficulty: 'hard',
        estimatedTime: '8 min',
        content: 'mix a cab; viz a van; max a numb; mix a cab; viz a van'
      },
      'bottom-row-19': {
        id: 'bottom-row-19',
        title: 'Bottom Row Keys - Level 19',
        description: 'Advanced word combinations',
        difficulty: 'hard',
        estimatedTime: '8 min',
        content: 'zombie vexing maximum combine vacuum zombie vexing'
      },
      'bottom-row-20': {
        id: 'bottom-row-20',
        title: 'Bottom Row Keys - Level 20',
        description: 'Advanced sentence practice',
        difficulty: 'hard',
        estimatedTime: '9 min',
        content: 'mix a cab viz; a van max; a numb mix; a cab viz; a van'
      },
      'bottom-row-21': {
        id: 'bottom-row-21',
        title: 'Bottom Row Keys - Level 21',
        description: 'Speed and accuracy balance',
        difficulty: 'hard',
        estimatedTime: '9 min',
        content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
      },
      'bottom-row-22': {
        id: 'bottom-row-22',
        title: 'Bottom Row Keys - Level 22',
        description: 'Finger independence practice',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'z, z, z, xm xm xm cv cv cv bn bn bn z,xmcvbn'
      },
      'bottom-row-23': {
        id: 'bottom-row-23',
        title: 'Bottom Row Keys - Level 23',
        description: 'Advanced finger patterns',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
      },
      'bottom-row-24': {
        id: 'bottom-row-24',
        title: 'Bottom Row Keys - Level 24',
        description: 'Complex word patterns',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'zombie vexing maximum combine vacuum zombie vexing'
      },
      'bottom-row-25': {
        id: 'bottom-row-25',
        title: 'Bottom Row Keys - Level 25',
        description: 'Complex sentence patterns',
        difficulty: 'hard',
        estimatedTime: '11 min',
        content: 'mix a cab viz; a van max; a numb mix; a cab viz; a van'
      },
      'bottom-row-26': {
        id: 'bottom-row-26',
        title: 'Bottom Row Keys - Level 26',
        description: 'Speed challenge advanced',
        difficulty: 'hard',
        estimatedTime: '11 min',
        content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
      },
      'bottom-row-27': {
        id: 'bottom-row-27',
        title: 'Bottom Row Keys - Level 27',
        description: 'Accuracy challenge advanced',
        difficulty: 'hard',
        estimatedTime: '12 min',
        content: 'zxcvbnm, zxcvbnm, zxcvbnm, zxcvbnm, zxcvbnm, zxcvbnm,'
      },
      'bottom-row-28': {
        id: 'bottom-row-28',
        title: 'Bottom Row Keys - Level 28',
        description: 'Endurance practice',
        difficulty: 'hard',
        estimatedTime: '12 min',
        content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
      },
      'bottom-row-29': {
        id: 'bottom-row-29',
        title: 'Bottom Row Keys - Level 29',
        description: 'Master challenge',
        difficulty: 'hard',
        estimatedTime: '13 min',
        content: 'mix a cab viz; a van max; a numb mix; a cab viz; a van; zombie vexing maximum combine vacuum'
      },
      'bottom-row-30': {
        id: 'bottom-row-30',
        title: 'Bottom Row Keys - Level 30',
        description: 'Bottom row mastery test',
        difficulty: 'hard',
        estimatedTime: '15 min',
        content: 'zxcv bnm, zxcv bnm, zxcv bnm, mix a cab viz; a van max; a numb mix; a cab viz; a van; zombie vexing maximum combine vacuum'
      },
    },
    intermediate: {
      'common-words': {
        id: 'common-words',
        title: 'Common Words',
        description: 'Practice typing the most common words in English',
        difficulty: 'medium',
        estimatedTime: '10 min',
        content: 'the and that have with this from they will not but what about which'
      },
      'punctuation': {
        id: 'punctuation',
        title: 'Punctuation',
        description: 'Master typing with punctuation marks',
        difficulty: 'medium',
        estimatedTime: '12 min',
        content: 'Hello, world! How are you? This is a test; it includes punctuation.'
      },
      'numbers': {
        id: 'numbers',
        title: 'Numbers and Symbols',
        description: 'Practice typing numbers and symbols',
        difficulty: 'hard',
        estimatedTime: '15 min',
        content: '1234 5678 90!@ #$%^ &*() _+[] {}|\:" <>?'
      },
    },
    intermediate: {
      'business-communication': {
        id: 'business-communication',
        title: 'Business Communication',
        description: 'Practice typing business-related content',
        difficulty: 'medium',
        estimatedTime: '15 min',
        content: 'Please find attached the quarterly report for Q3 2023. Our revenue increased by 15% compared to the previous quarter. We will discuss these results during our next meeting.'
      },
      'technical-writing': {
        id: 'technical-writing',
        title: 'Technical Writing',
        description: 'Practice typing technical documentation',
        difficulty: 'medium',
        estimatedTime: '15 min',
        content: 'The API endpoint accepts POST requests with JSON payloads. Authentication requires a valid JWT token in the Authorization header. Rate limiting is set to 100 requests per minute.'
      },
      'scientific-terminology': {
        id: 'scientific-terminology',
        title: 'Scientific Terminology',
        description: 'Practice typing scientific terms and concepts',
        difficulty: 'hard',
        estimatedTime: '18 min',
        content: 'Photosynthesis is the process by which plants convert light energy into chemical energy. The mitochondria is often referred to as the powerhouse of the cell.'
      },
      'common-words-1': {
        id: 'common-words-1',
        title: 'Common Words - Level 1',
        description: 'Practice typing frequently used words',
        difficulty: 'medium',
        estimatedTime: '10 min',
        content: 'the and to of in is it you that was for on are with as his they be at one have this from or had by hot but some what there we can out other were all your when up use word how said an each she which do their time if will way about many then them would write like so these her long make thing see him two has look more day could go come did my sound no most number who over know water than call first people may down side been now find any new work part take get place made live where after back little only round man year came show every good me give our under name very through just form much great think say help low line before turn cause same mean differ move right boy old too does tell sentence set three want air well also play small end put home read hand port large spell add even land here must big high such follow act why ask men change went light kind off need house picture try us again animal point mother world near build self earth father head stand own page should country found answer school grow study still learn plant cover food sun four thought let keep eye never last door between city tree cross since hard start might story saw far sea draw left late run don\'t while press close night real life few stop open seem together next white children begin got walk example ease paper'
      },
    },
    advanced: {
      'code-snippets': {
        id: 'code-snippets',
        title: 'Code Snippets',
        description: 'Practice typing common programming patterns',
        difficulty: 'hard',
        estimatedTime: '15 min',
        content: 'function calculateSum(a, b) {\n  return a + b;\n}\n\nconst result = calculateSum(5, 10);'
      },
      'speed-drills': {
        id: 'speed-drills',
        title: 'Speed Drills',
        description: 'Improve your typing speed with these targeted exercises',
        difficulty: 'hard',
        estimatedTime: '10 min',
        content: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.'
      },
      'paragraphs': {
        id: 'paragraphs',
        title: 'Full Paragraphs',
        description: 'Type complete paragraphs to build stamina and consistency',
        difficulty: 'hard',
        estimatedTime: '20 min',
        content: 'Typing is an essential skill in today\'s digital world. Regular practice can help you become more efficient and productive. The key to improving is consistency and proper technique.'
      },
      'programming-paradigms': {
        id: 'programming-paradigms',
        title: 'Programming Paradigms',
        description: 'Practice typing about different programming paradigms',
        difficulty: 'hard',
        estimatedTime: '18 min',
        content: 'Object-oriented programming focuses on objects and classes. Functional programming treats computation as the evaluation of mathematical functions. Procedural programming is based on procedure calls. Declarative programming expresses the logic without describing the control flow.'
      },
      'database-concepts': {
        id: 'database-concepts',
        title: 'Database Concepts',
        description: 'Practice typing about database systems and concepts',
        difficulty: 'hard',
        estimatedTime: '20 min',
        content: 'SQL is used for relational databases like MySQL and PostgreSQL. NoSQL databases include MongoDB and Cassandra. ACID properties ensure reliable transaction processing. Indexing improves query performance but may slow down write operations.'
      },
      'cloud-architecture': {
        id: 'cloud-architecture',
        title: 'Cloud Architecture',
        description: 'Practice typing about cloud computing concepts',
        difficulty: 'hard',
        estimatedTime: '22 min',
        content: 'Infrastructure as a Service (IaaS) provides virtualized computing resources. Platform as a Service (PaaS) offers hardware and software tools over the internet. Software as a Service (SaaS) delivers software applications over the internet. Serverless computing allows developers to build applications without managing servers.'
      },
      'cybersecurity-principles': {
        id: 'cybersecurity-principles',
        title: 'Cybersecurity Principles',
        description: 'Practice typing about cybersecurity concepts',
        difficulty: 'hard',
        estimatedTime: '20 min',
        content: 'Encryption protects data by converting it into code. Authentication verifies user identity. Authorization determines user access rights. A firewall monitors and filters network traffic. Multi-factor authentication requires multiple verification methods.'
      },
      'machine-learning-concepts': {
        id: 'machine-learning-concepts',
        title: 'Machine Learning Concepts',
        description: 'Practice typing about machine learning fundamentals',
        difficulty: 'hard',
        estimatedTime: '22 min',
        content: 'Supervised learning uses labeled datasets to train algorithms. Unsupervised learning identifies patterns in unlabeled data. Reinforcement learning trains agents through reward-based feedback. Neural networks are computing systems inspired by biological neural networks. Deep learning uses multiple layers of neural networks.'
      },
    },
  };

  const currentLesson = lessonData[level]?.[lessonId] || {
    id: 'not-found',
    title: 'Lesson Not Found',
    description: 'The requested lesson does not exist.',
    difficulty: 'easy' as const,
    estimatedTime: 'N/A',
    content: ''
  };

  useEffect(() => {
    if (isStarted && !isCompleted) {
      timerRef.current = setInterval(() => {
        if (startTime) {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          setElapsedTime(elapsed);
          
          // Calculate current WPM and accuracy
          const currentWpm = calculateWPM(currentInput, elapsed);
          const currentAccuracy = calculateAccuracy(currentInput, currentLesson.content.substring(0, currentInput.length));
          
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
  }, [isStarted, isCompleted, startTime, currentInput, currentLesson.content]);

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
    const normalizedTarget = currentLesson.content.replace(/\r\n/g, '\n');
    
    // Check if lesson is completed
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
    if (currentLesson.content.length === 0) return 0;
    return (currentInput.length / currentLesson.content.length) * 100;
  };

  const getPerformanceRating = () => {
    if (wpm >= 60 && accuracy >= 95) return 'Excellent';
    if (wpm >= 40 && accuracy >= 90) return 'Good';
    if (wpm >= 20 && accuracy >= 85) return 'Average';
    return 'Needs Practice';
  };

  const getNextLevelId = () => {
    // Extract the base type and current level number
    const match = lessonId.match(/([a-z-]+)-(\d+)/);
    if (!match) return null;
    
    const [, baseType, levelNum] = match;
    const nextLevelNum = parseInt(levelNum) + 1;
    
    // Check if next level exists in the current level type
    const nextLevelId = `${baseType}-${nextLevelNum}`;
    if (lessonData[level]?.[nextLevelId]) {
      return nextLevelId;
    }
    
    return null;
  };
  
  const nextLevelId = getNextLevelId();

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Link href={`/typing-levels/${level}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {level.charAt(0).toUpperCase() + level.slice(1)} Lessons
            </Button>
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{currentLesson.title}</h1>
          <p className="text-muted-foreground">
            {currentLesson.description}
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
                  <p>Ready to start the lesson?</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span>{currentLesson.estimatedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="capitalize">{currentLesson.difficulty}</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleStart}>Start Typing</Button>
              </div>
            ) : isCompleted ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold">Lesson Completed!</h3>
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
                  {nextLevelId ? (
                    <Link href={`/typing-levels/${level}/${nextLevelId}`}>
                      <Button variant="secondary">Next Level</Button>
                    </Link>
                  ) : null}
                  <Link href={`/typing-levels/${level}`}>
                    <Button variant="outline">Back to Lessons</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative p-4 rounded-md bg-muted/50 font-mono text-sm max-h-[400px] overflow-y-auto custom-scrollbar">
                  {currentLesson.content.split('').map((char, index) => {
                    let className = '';
                    if (index < currentInput.length) {
                      className = currentInput[index] === char ? 'text-green-500' : 'text-red-500';
                    } else if (index === currentInput.length) {
                      // Current character to type
                      className = 'bg-primary/20 border-b-2 border-primary animate-blink';
                    }
                    return (
                      <span key={index} className={className}>
                        {char === '\n' ? <br /> : char}
                      </span>
                    );
                  })}
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