'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Award } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface LessonType {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  content: string;
}

export default function LevelPage() {
  const params = useParams();
  const level = params.level as string;
  
  // Mock data for different levels
  const levelData: Record<string, { title: string; description: string; lessons: LessonType[] }> = {
    beginner: {
      title: 'Beginner Typing Lessons',
      description: 'Master the basics of touch typing with these foundational lessons.',
      lessons: [
        // Home Row Keys - 30 levels
        {
          id: 'home-row-1',
          title: 'Home Row Keys - Level 1',
          description: 'Learn the home row keys: A, S, D, F',
          difficulty: 'easy',
          estimatedTime: '3 min',
          content: 'aaaa ssss dddd ffff aaaa ssss dddd ffff'
        },
        {
          id: 'home-row-2',
          title: 'Home Row Keys - Level 2',
          description: 'Learn the home row keys: J, K, L, ;',
          difficulty: 'easy',
          estimatedTime: '3 min',
          content: 'jjjj kkkk llll ;;;; jjjj kkkk llll ;;;;'
        },
        {
          id: 'home-row-3',
          title: 'Home Row Keys - Level 3',
          description: 'Combine left home row keys: A, S, D, F',
          difficulty: 'easy',
          estimatedTime: '4 min',
          content: 'asdf asdf asdf asdf fdsa fdsa fdsa fdsa'
        },
        {
          id: 'home-row-4',
          title: 'Home Row Keys - Level 4',
          description: 'Combine right home row keys: J, K, L, ;',
          difficulty: 'easy',
          estimatedTime: '4 min',
          content: 'jkl; jkl; jkl; jkl; ;lkj ;lkj ;lkj ;lkj'
        },
        {
          id: 'home-row-5',
          title: 'Home Row Keys - Level 5',
          description: 'Combine all home row keys',
          difficulty: 'easy',
          estimatedTime: '5 min',
          content: 'asdf jkl; asdf jkl; fjdk slal djas flak jdsa l;ak'
        },
        {
          id: 'home-row-6',
          title: 'Home Row Keys - Level 6',
          description: 'Practice words using home row keys',
          difficulty: 'easy',
          estimatedTime: '5 min',
          content: 'as dad fad sad lad jak lal fall salad'
        },
        {
          id: 'home-row-7',
          title: 'Home Row Keys - Level 7',
          description: 'More words using home row keys',
          difficulty: 'easy',
          estimatedTime: '5 min',
          content: 'ask flask salsa jalal alaska dasal'
        },
        {
          id: 'home-row-8',
          title: 'Home Row Keys - Level 8',
          description: 'Short sentences with home row keys',
          difficulty: 'medium',
          estimatedTime: '6 min',
          content: 'a lad asks dad; a sad lad; a flask falls; a salad'
        },
        {
          id: 'home-row-9',
          title: 'Home Row Keys - Level 9',
          description: 'Longer sentences with home row keys',
          difficulty: 'medium',
          estimatedTime: '6 min',
          content: 'dad asks a lad; a salad as a salsa; a flask falls as a lad asks'
        },
        {
          id: 'home-row-10',
          title: 'Home Row Keys - Level 10',
          description: 'Speed practice with home row keys',
          difficulty: 'medium',
          estimatedTime: '7 min',
          content: 'asdf jkl; asdf jkl; fjdk slal djas flak jdsa l;ak asdf jkl;'
        },
        {
          id: 'home-row-11',
          title: 'Home Row Keys - Level 11',
          description: 'Alternating fingers practice',
          difficulty: 'medium',
          estimatedTime: '5 min',
          content: 'aj sk dl f; aj sk dl f; aj sk dl f; aj sk dl f;'
        },
        {
          id: 'home-row-12',
          title: 'Home Row Keys - Level 12',
          description: 'Double letter practice',
          difficulty: 'medium',
          estimatedTime: '5 min',
          content: 'aass ddjj ffkk ll;; aass ddjj ffkk ll;;'
        },
        {
          id: 'home-row-13',
          title: 'Home Row Keys - Level 13',
          description: 'Triple letter practice',
          difficulty: 'medium',
          estimatedTime: '5 min',
          content: 'aaasss dddjjj fffkkk lll;;; aaasss dddjjj'
        },
        {
          id: 'home-row-14',
          title: 'Home Row Keys - Level 14',
          description: 'Rhythm practice',
          difficulty: 'medium',
          estimatedTime: '6 min',
          content: 'aj aj aj sk sk sk dl dl dl f; f; f; ajsk dlf;'
        },
        {
          id: 'home-row-15',
          title: 'Home Row Keys - Level 15',
          description: 'Speed challenge',
          difficulty: 'medium',
          estimatedTime: '7 min',
          content: 'asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl;'
        },
        {
          id: 'home-row-16',
          title: 'Home Row Keys - Level 16',
          description: 'Accuracy challenge',
          difficulty: 'medium',
          estimatedTime: '7 min',
          content: 'aaa sss ddd fff jjj kkk lll ;;; asdfjkl;'
        },
        {
          id: 'home-row-17',
          title: 'Home Row Keys - Level 17',
          description: 'Word combinations',
          difficulty: 'medium',
          estimatedTime: '8 min',
          content: 'all fall sad lad dad fad jak ask flask'
        },
        {
          id: 'home-row-18',
          title: 'Home Row Keys - Level 18',
          description: 'Sentence practice',
          difficulty: 'hard',
          estimatedTime: '8 min',
          content: 'a sad lad asks dad; all fall as a flask falls; a salad'
        },
        {
          id: 'home-row-19',
          title: 'Home Row Keys - Level 19',
          description: 'Advanced word combinations',
          difficulty: 'hard',
          estimatedTime: '8 min',
          content: 'salsa flask alaska dallas salad falafel'
        },
        {
          id: 'home-row-20',
          title: 'Home Row Keys - Level 20',
          description: 'Advanced sentence practice',
          difficulty: 'hard',
          estimatedTime: '9 min',
          content: 'a lad asks dad for a salad; a flask falls as all ask; a salsa'
        },
        {
          id: 'home-row-21',
          title: 'Home Row Keys - Level 21',
          description: 'Speed and accuracy balance',
          difficulty: 'hard',
          estimatedTime: '9 min',
          content: 'asdf jkl; asdf jkl; fjdk slal djas flak jdsa l;ak asdf jkl;'
        },
        {
          id: 'home-row-22',
          title: 'Home Row Keys - Level 22',
          description: 'Finger independence practice',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'af af af sj sj sj dk dk dk l; l; l; afsjdkl;'
        },
        {
          id: 'home-row-23',
          title: 'Home Row Keys - Level 23',
          description: 'Advanced finger patterns',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'afs jdkl afs jdkl afs jdkl afs jdkl afs jdkl'
        },
        {
          id: 'home-row-24',
          title: 'Home Row Keys - Level 24',
          description: 'Complex word patterns',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'flask salad alaska dallas falafel salsa'
        },
        {
          id: 'home-row-25',
          title: 'Home Row Keys - Level 25',
          description: 'Complex sentence patterns',
          difficulty: 'hard',
          estimatedTime: '11 min',
          content: 'a lad asks dad for a salad; a flask falls as all ask; a salsa'
        },
        {
          id: 'home-row-26',
          title: 'Home Row Keys - Level 26',
          description: 'Speed challenge advanced',
          difficulty: 'hard',
          estimatedTime: '11 min',
          content: 'asdf jkl; fjdk slal djas flak jdsa l;ak asdf jkl; fjdk slal'
        },
        {
          id: 'home-row-27',
          title: 'Home Row Keys - Level 27',
          description: 'Accuracy challenge advanced',
          difficulty: 'hard',
          estimatedTime: '12 min',
          content: 'asdfjkl; asdfjkl; asdfjkl; asdfjkl; asdfjkl; asdfjkl;'
        },
        {
          id: 'home-row-28',
          title: 'Home Row Keys - Level 28',
          description: 'Endurance practice',
          difficulty: 'hard',
          estimatedTime: '12 min',
          content: 'asdf jkl; asdf jkl; fjdk slal djas flak jdsa l;ak asdf jkl; fjdk slal djas flak jdsa l;ak'
        },
        {
          id: 'home-row-29',
          title: 'Home Row Keys - Level 29',
          description: 'Master challenge',
          difficulty: 'hard',
          estimatedTime: '13 min',
          content: 'a sad lad asks dad; all fall as a flask falls; a salad as a salsa; a flask falls as a lad asks'
        },
        {
          id: 'home-row-30',
          title: 'Home Row Keys - Level 30',
          description: 'Home row mastery test',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'asdf jkl; fjdk slal djas flak jdsa l;ak a sad lad asks dad; all fall as a flask falls; a salad as a salsa; a flask falls as a lad asks'
        },
        
        // Top Row Keys - 30 levels
        {
          id: 'top-row-1',
          title: 'Top Row Keys - Level 1',
          description: 'Learn the left top row keys: Q, W, E, R, T',
          difficulty: 'easy',
          estimatedTime: '3 min',
          content: 'qqqq wwww eeee rrrr tttt qqqq wwww eeee rrrr tttt'
        },
        {
          id: 'top-row-2',
          title: 'Top Row Keys - Level 2',
          description: 'Learn the right top row keys: Y, U, I, O, P',
          difficulty: 'easy',
          estimatedTime: '3 min',
          content: 'yyyy uuuu iiii oooo pppp yyyy uuuu iiii oooo pppp'
        },
        {
          id: 'top-row-3',
          title: 'Top Row Keys - Level 3',
          description: 'Combine left top row keys',
          difficulty: 'easy',
          estimatedTime: '4 min',
          content: 'qwert qwert qwert qwert trewq trewq trewq trewq'
        },
        {
          id: 'top-row-4',
          title: 'Top Row Keys - Level 4',
          description: 'Combine right top row keys',
          difficulty: 'easy',
          estimatedTime: '4 min',
          content: 'yuiop yuiop yuiop yuiop poiuy poiuy poiuy poiuy'
        },
        {
          id: 'top-row-5',
          title: 'Top Row Keys - Level 5',
          description: 'Combine all top row keys',
          difficulty: 'easy',
          estimatedTime: '5 min',
          content: 'qwert yuiop qwert yuiop qwer tyui opqw erty uiop'
        },
        {
          id: 'top-row-6',
          title: 'Top Row Keys - Level 6',
          description: 'Practice words using top row keys',
          difficulty: 'easy',
          estimatedTime: '5 min',
          content: 'we type quiet power you it to we type quiet power'
        },
        {
          id: 'top-row-7',
          title: 'Top Row Keys - Level 7',
          description: 'More words using top row keys',
          difficulty: 'easy',
          estimatedTime: '5 min',
          content: 'quit write type rope your pit wet quit write type'
        },
        {
          id: 'top-row-8',
          title: 'Top Row Keys - Level 8',
          description: 'Short sentences with top row keys',
          difficulty: 'medium',
          estimatedTime: '6 min',
          content: 'we type; you write; quiet power; it to you; we type'
        },
        {
          id: 'top-row-9',
          title: 'Top Row Keys - Level 9',
          description: 'Longer sentences with top row keys',
          difficulty: 'medium',
          estimatedTime: '6 min',
          content: 'we type to you; write your power; it is quiet to type'
        },
        {
          id: 'top-row-10',
          title: 'Top Row Keys - Level 10',
          description: 'Speed practice with top row keys',
          difficulty: 'medium',
          estimatedTime: '7 min',
          content: 'qwert yuiop qwert yuiop qwer tyui opqw erty uiop qwert yuiop'
        },
        {
          id: 'top-row-11',
          title: 'Top Row Keys - Level 11',
          description: 'Alternating fingers practice',
          difficulty: 'medium',
          estimatedTime: '5 min',
          content: 'qy we rt ui op qy we rt ui op qy we rt ui op'
        },
        {
          id: 'top-row-12',
          title: 'Top Row Keys - Level 12',
          description: 'Double letter practice',
          difficulty: 'medium',
          estimatedTime: '5 min',
          content: 'qqww eerr ttyy uuii oopp qqww eerr ttyy uuii oopp'
        },
        {
          id: 'top-row-13',
          title: 'Top Row Keys - Level 13',
          description: 'Triple letter practice',
          difficulty: 'medium',
          estimatedTime: '5 min',
          content: 'qqqwww eeerrr tttuuu iiiooo ppp qqqwww eeerrr'
        },
        {
          id: 'top-row-14',
          title: 'Top Row Keys - Level 14',
          description: 'Rhythm practice',
          difficulty: 'medium',
          estimatedTime: '6 min',
          content: 'qy qy qy we we we rt rt rt ui ui ui op op op qywertui'
        },
        {
          id: 'top-row-15',
          title: 'Top Row Keys - Level 15',
          description: 'Speed challenge',
          difficulty: 'medium',
          estimatedTime: '7 min',
          content: 'qwert yuiop qwert yuiop qwert yuiop qwert yuiop qwert yuiop'
        },
        {
          id: 'top-row-16',
          title: 'Top Row Keys - Level 16',
          description: 'Accuracy challenge',
          difficulty: 'medium',
          estimatedTime: '7 min',
          content: 'qqq www eee rrr ttt yyy uuu iii ooo ppp qwertyuiop'
        },
        {
          id: 'top-row-17',
          title: 'Top Row Keys - Level 17',
          description: 'Word combinations',
          difficulty: 'medium',
          estimatedTime: '8 min',
          content: 'type write quit power your it to we type write quit'
        },
        {
          id: 'top-row-18',
          title: 'Top Row Keys - Level 18',
          description: 'Sentence practice',
          difficulty: 'hard',
          estimatedTime: '8 min',
          content: 'we type to you; write your power; it is quiet to type; we write'
        },
        {
          id: 'top-row-19',
          title: 'Top Row Keys - Level 19',
          description: 'Advanced word combinations',
          difficulty: 'hard',
          estimatedTime: '8 min',
          content: 'typewriter quieter power your write type quit'
        },
        {
          id: 'top-row-20',
          title: 'Top Row Keys - Level 20',
          description: 'Advanced sentence practice',
          difficulty: 'hard',
          estimatedTime: '9 min',
          content: 'we type to you quietly; write your power type; it is quiet to type'
        },
        {
          id: 'top-row-21',
          title: 'Top Row Keys - Level 21',
          description: 'Speed and accuracy balance',
          difficulty: 'hard',
          estimatedTime: '9 min',
          content: 'qwert yuiop qwert yuiop qwer tyui opqw erty uiop qwert yuiop'
        },
        {
          id: 'top-row-22',
          title: 'Top Row Keys - Level 22',
          description: 'Finger independence practice',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'qp qp qp we we we rt rt rt ui ui ui qpwertui'
        },
        {
          id: 'top-row-23',
          title: 'Top Row Keys - Level 23',
          description: 'Advanced finger patterns',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'qwer tyuio qwer tyuio qwer tyuio qwer tyuio qwer tyuio'
        },
        {
          id: 'top-row-24',
          title: 'Top Row Keys - Level 24',
          description: 'Complex word patterns',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'typewriter quieter power your write type quit typewriter'
        },
        {
          id: 'top-row-25',
          title: 'Top Row Keys - Level 25',
          description: 'Complex sentence patterns',
          difficulty: 'hard',
          estimatedTime: '11 min',
          content: 'we type to you quietly; write your power type; it is quiet to type'
        },
        {
          id: 'top-row-26',
          title: 'Top Row Keys - Level 26',
          description: 'Speed challenge advanced',
          difficulty: 'hard',
          estimatedTime: '11 min',
          content: 'qwert yuiop qwer tyui opqw erty uiop qwert yuiop qwer tyui opqw'
        },
        {
          id: 'top-row-27',
          title: 'Top Row Keys - Level 27',
          description: 'Accuracy challenge advanced',
          difficulty: 'hard',
          estimatedTime: '12 min',
          content: 'qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop'
        },
        {
          id: 'top-row-28',
          title: 'Top Row Keys - Level 28',
          description: 'Endurance practice',
          difficulty: 'hard',
          estimatedTime: '12 min',
          content: 'qwert yuiop qwert yuiop qwer tyui opqw erty uiop qwert yuiop qwer tyui opqw erty uiop'
        },
        {
          id: 'top-row-29',
          title: 'Top Row Keys - Level 29',
          description: 'Master challenge',
          difficulty: 'hard',
          estimatedTime: '13 min',
          content: 'we type to you quietly; write your power type; it is quiet to type; we write to you; type your quiet power'
        },
        {
          id: 'top-row-30',
          title: 'Top Row Keys - Level 30',
          description: 'Top row mastery test',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'qwert yuiop qwer tyui opqw erty uiop we type to you quietly; write your power type; it is quiet to type; we write to you; type your quiet power'
        },
        
        // Bottom Row Keys - 30 levels
        {
          id: 'bottom-row-1',
          title: 'Bottom Row Keys - Level 1',
          description: 'Learn the left bottom row keys: Z, X, C, V',
          difficulty: 'easy',
          estimatedTime: '3 min',
          content: 'zzzz xxxx cccc vvvv zzzz xxxx cccc vvvv'
        },
        {
          id: 'bottom-row-2',
          title: 'Bottom Row Keys - Level 2',
          description: 'Learn the right bottom row keys: B, N, M',
          difficulty: 'easy',
          estimatedTime: '3 min',
          content: 'bbbb nnnn mmmm bbbb nnnn mmmm bbbb nnnn mmmm'
        },
        {
          id: 'bottom-row-3',
          title: 'Bottom Row Keys - Level 3',
          description: 'Combine left bottom row keys',
          difficulty: 'easy',
          estimatedTime: '4 min',
          content: 'zxcv zxcv zxcv zxcv vcxz vcxz vcxz vcxz'
        },
        {
          id: 'bottom-row-4',
          title: 'Bottom Row Keys - Level 4',
          description: 'Combine right bottom row keys',
          difficulty: 'easy',
          estimatedTime: '4 min',
          content: 'bnm, bnm, bnm, bnm, ,mnb ,mnb ,mnb ,mnb'
        },
        {
          id: 'bottom-row-5',
          title: 'Bottom Row Keys - Level 5',
          description: 'Combine all bottom row keys',
          difficulty: 'easy',
          estimatedTime: '5 min',
          content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
        },
        {
          id: 'bottom-row-6',
          title: 'Bottom Row Keys - Level 6',
          description: 'Practice words using bottom row keys',
          difficulty: 'easy',
          estimatedTime: '5 min',
          content: 'mix viz cab van max mix viz cab van max'
        },
        {
          id: 'bottom-row-7',
          title: 'Bottom Row Keys - Level 7',
          description: 'More words using bottom row keys',
          difficulty: 'easy',
          estimatedTime: '5 min',
          content: 'zinc vex cab numb mix zinc vex cab numb mix'
        },
        {
          id: 'bottom-row-8',
          title: 'Bottom Row Keys - Level 8',
          description: 'Short sentences with bottom row keys',
          difficulty: 'medium',
          estimatedTime: '6 min',
          content: 'mix cab; viz van; max numb; mix cab; viz van'
        },
        {
          id: 'bottom-row-9',
          title: 'Bottom Row Keys - Level 9',
          description: 'Longer sentences with bottom row keys',
          difficulty: 'medium',
          estimatedTime: '6 min',
          content: 'mix a cab; viz a van; max a numb; mix a cab; viz a van'
        },
        {
          id: 'bottom-row-10',
          title: 'Bottom Row Keys - Level 10',
          description: 'Speed practice with bottom row keys',
          difficulty: 'medium',
          estimatedTime: '7 min',
          content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
        },
        {
          id: 'bottom-row-11',
          title: 'Bottom Row Keys - Level 11',
          description: 'Alternating fingers practice',
          difficulty: 'medium',
          estimatedTime: '5 min',
          content: 'zb xn cm v, zb xn cm v, zb xn cm v, zb xn cm v,'
        },
        {
          id: 'bottom-row-12',
          title: 'Bottom Row Keys - Level 12',
          description: 'Double letter practice',
          difficulty: 'medium',
          estimatedTime: '5 min',
          content: 'zzxx ccvv bbnn mm,, zzxx ccvv bbnn mm,,'
        },
        {
          id: 'bottom-row-13',
          title: 'Bottom Row Keys - Level 13',
          description: 'Triple letter practice',
          difficulty: 'medium',
          estimatedTime: '5 min',
          content: 'zzzxxx cccvvv bbbnnn mmm,,, zzzxxx cccvvv'
        },
        {
          id: 'bottom-row-14',
          title: 'Bottom Row Keys - Level 14',
          description: 'Rhythm practice',
          difficulty: 'medium',
          estimatedTime: '6 min',
          content: 'zb zb zb xn xn xn cm cm cm v, v, v, zbxncmv,'
        },
        {
          id: 'bottom-row-15',
          title: 'Bottom Row Keys - Level 15',
          description: 'Speed challenge',
          difficulty: 'medium',
          estimatedTime: '7 min',
          content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
        },
        {
          id: 'bottom-row-16',
          title: 'Bottom Row Keys - Level 16',
          description: 'Accuracy challenge',
          difficulty: 'medium',
          estimatedTime: '7 min',
          content: 'zzz xxx ccc vvv bbb nnn mmm ,,, zxcvbnm,'
        },
        {
          id: 'bottom-row-17',
          title: 'Bottom Row Keys - Level 17',
          description: 'Word combinations',
          difficulty: 'medium',
          estimatedTime: '8 min',
          content: 'mix viz cab van max numb zinc vex mix viz'
        },
        {
          id: 'bottom-row-18',
          title: 'Bottom Row Keys - Level 18',
          description: 'Sentence practice',
          difficulty: 'hard',
          estimatedTime: '8 min',
          content: 'mix a cab; viz a van; max a numb; mix a cab; viz a van'
        },
        {
          id: 'bottom-row-19',
          title: 'Bottom Row Keys - Level 19',
          description: 'Advanced word combinations',
          difficulty: 'hard',
          estimatedTime: '8 min',
          content: 'zombie vexing maximum combine vacuum zombie vexing'
        },
        {
          id: 'bottom-row-20',
          title: 'Bottom Row Keys - Level 20',
          description: 'Advanced sentence practice',
          difficulty: 'hard',
          estimatedTime: '9 min',
          content: 'mix a cab viz; a van max; a numb mix; a cab viz; a van'
        },
        {
          id: 'bottom-row-21',
          title: 'Bottom Row Keys - Level 21',
          description: 'Speed and accuracy balance',
          difficulty: 'hard',
          estimatedTime: '9 min',
          content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
        },
        {
          id: 'bottom-row-22',
          title: 'Bottom Row Keys - Level 22',
          description: 'Finger independence practice',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'z, z, z, xm xm xm cv cv cv bn bn bn z,xmcvbn'
        },
        {
          id: 'bottom-row-23',
          title: 'Bottom Row Keys - Level 23',
          description: 'Advanced finger patterns',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
        },
        {
          id: 'bottom-row-24',
          title: 'Bottom Row Keys - Level 24',
          description: 'Complex word patterns',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'zombie vexing maximum combine vacuum zombie vexing'
        },
        {
          id: 'bottom-row-25',
          title: 'Bottom Row Keys - Level 25',
          description: 'Complex sentence patterns',
          difficulty: 'hard',
          estimatedTime: '11 min',
          content: 'mix a cab viz; a van max; a numb mix; a cab viz; a van'
        },
        {
          id: 'bottom-row-26',
          title: 'Bottom Row Keys - Level 26',
          description: 'Speed challenge advanced',
          difficulty: 'hard',
          estimatedTime: '11 min',
          content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
        },
        {
          id: 'bottom-row-27',
          title: 'Bottom Row Keys - Level 27',
          description: 'Accuracy challenge advanced',
          difficulty: 'hard',
          estimatedTime: '12 min',
          content: 'zxcvbnm, zxcvbnm, zxcvbnm, zxcvbnm, zxcvbnm, zxcvbnm,'
        },
        {
          id: 'bottom-row-28',
          title: 'Bottom Row Keys - Level 28',
          description: 'Endurance practice',
          difficulty: 'hard',
          estimatedTime: '12 min',
          content: 'zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm, zxcv bnm,'
        },
        {
          id: 'bottom-row-29',
          title: 'Bottom Row Keys - Level 29',
          description: 'Master challenge',
          difficulty: 'hard',
          estimatedTime: '13 min',
          content: 'mix a cab viz; a van max; a numb mix; a cab viz; a van; zombie vexing maximum combine vacuum'
        },
        {
          id: 'bottom-row-30',
          title: 'Bottom Row Keys - Level 30',
          description: 'Bottom row mastery test',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'zxcv bnm, zxcv bnm, zxcv bnm, mix a cab viz; a van max; a numb mix; a cab viz; a van; zombie vexing maximum combine vacuum'
        },
      ],
    },
    intermediate: {
      title: 'Intermediate Typing Lessons',
      description: 'Improve your speed and accuracy with more complex exercises.',
      lessons: [
        {
          id: 'intermediate-1',
          title: 'Common Words - Level 1',
          description: 'Practice typing the most common words in English',
          difficulty: 'medium',
          estimatedTime: '8 min',
          content: 'the and that have with this from they will not but what about which'
        },
        {
          id: 'intermediate-2',
          title: 'Common Words - Level 2',
          description: 'Continue practicing common English words',
          difficulty: 'medium',
          estimatedTime: '8 min',
          content: 'when there use been one would like time than now could other'
        },
        {
          id: 'intermediate-3',
          title: 'Common Words - Level 3',
          description: 'Advanced common word combinations',
          difficulty: 'medium',
          estimatedTime: '9 min',
          content: 'the time when there would have been one like could other than now'
        },
        {
          id: 'intermediate-4',
          title: 'Short Phrases - Level 1',
          description: 'Practice typing short common phrases',
          difficulty: 'medium',
          estimatedTime: '9 min',
          content: 'in the morning; at the same time; for the most part; on the other hand'
        },
        {
          id: 'intermediate-5',
          title: 'Short Phrases - Level 2',
          description: 'More practice with short phrases',
          difficulty: 'medium',
          estimatedTime: '10 min',
          content: 'as a matter of fact; in the first place; to make a long story short; sooner or later'
        },
        {
          id: 'intermediate-31',
          title: 'Business Communication',
          description: 'Practice typing business emails and memos',
          difficulty: 'medium',
          estimatedTime: '12 min',
          content: 'Dear Team, I wanted to follow up on our discussion from yesterday\'s meeting. Please review the attached proposal and provide your feedback by end of day Friday. Thank you for your attention to this matter.'
        },
        {
          id: 'intermediate-32',
          title: 'Technical Writing',
          description: 'Practice typing technical documentation',
          difficulty: 'medium',
          estimatedTime: '15 min',
          content: 'The application uses a three-tier architecture consisting of a presentation layer, business logic layer, and data access layer. API requests are processed through middleware that handles authentication, logging, and error handling before reaching the appropriate controller.'
        },
        {
          id: 'intermediate-33',
          title: 'Scientific Terminology',
          description: 'Practice typing scientific terms and concepts',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'The experiment demonstrated that photosynthesis rates increased under controlled conditions with elevated CO2 levels. Chlorophyll absorption was measured at wavelengths between 400-700nm, with peak efficiency observed at 650nm.'
        },
        {
          id: 'intermediate-6',
          title: 'Punctuation - Level 1',
          description: 'Basic punctuation practice',
          difficulty: 'medium',
          estimatedTime: '10 min',
          content: 'Hello, world! How are you? This is a test; it includes punctuation.'
        },
        {
          id: 'intermediate-7',
          title: 'Punctuation - Level 2',
          description: 'Advanced punctuation practice',
          difficulty: 'medium',
          estimatedTime: '11 min',
          content: 'Wait—what? "I didn\'t know that," she said. It\'s true; however, I\'m not surprised!'
        },
        {
          id: 'intermediate-8',
          title: 'Capitalization - Level 1',
          description: 'Practice with proper capitalization',
          difficulty: 'medium',
          estimatedTime: '11 min',
          content: 'John lives in New York City. He works for Google and visits Tokyo every December.'
        },
        {
          id: 'intermediate-9',
          title: 'Capitalization - Level 2',
          description: 'More practice with capitalization',
          difficulty: 'medium',
          estimatedTime: '12 min',
          content: 'On Monday, Dr. Smith visited the Museum of Modern Art after meeting with President Johnson.'
        },
        {
          id: 'intermediate-10',
          title: 'Numbers - Level 1',
          description: 'Basic number typing practice',
          difficulty: 'medium',
          estimatedTime: '10 min',
          content: '1234 5678 90 123 456 789 1234 5678 90 123 456 789'
        },
        {
          id: 'intermediate-11',
          title: 'Numbers - Level 2',
          description: 'Numbers in context',
          difficulty: 'medium',
          estimatedTime: '11 min',
          content: 'Room 237 is on the 2nd floor. The price is $19.99 and the sale ends on 12/31/2023.'
        },
        {
          id: 'intermediate-12',
          title: 'Symbols - Level 1',
          description: 'Basic symbol typing practice',
          difficulty: 'medium',
          estimatedTime: '12 min',
          content: '!@#$ %^&* ()_+ []{}\\|;:\'",.<>/?'
        },
        {
          id: 'intermediate-13',
          title: 'Symbols - Level 2',
          description: 'Symbols in context',
          difficulty: 'hard',
          estimatedTime: '12 min',
          content: 'Email: john.doe@example.com | Password: P@$$w0rd! | Website: https://www.example.com/'
        },
        {
          id: 'intermediate-14',
          title: 'Mixed Content - Level 1',
          description: 'Practice with mixed content types',
          difficulty: 'hard',
          estimatedTime: '13 min',
          content: 'On 4/15, I paid $1,234.56 for the new iPhone 13 Pro at the Apple Store on 5th Avenue.'
        },
        {
          id: 'intermediate-15',
          title: 'Mixed Content - Level 2',
          description: 'Advanced mixed content practice',
          difficulty: 'hard',
          estimatedTime: '13 min',
          content: 'The meeting is at 3:30 PM (EST) on Wed., Jan. 22nd, 2023. Please RSVP to admin@company.com by 12/15.'
        },
        {
          id: 'intermediate-16',
          title: 'Short Paragraphs - Level 1',
          description: 'Practice typing short paragraphs',
          difficulty: 'hard',
          estimatedTime: '14 min',
          content: 'The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet. Typing practice helps improve both speed and accuracy over time.'
        },
        {
          id: 'intermediate-17',
          title: 'Short Paragraphs - Level 2',
          description: 'More paragraph practice',
          difficulty: 'hard',
          estimatedTime: '14 min',
          content: 'Learning to type efficiently is an essential skill in today\'s digital world. Regular practice can help you become more productive. The key is consistency and proper technique.'
        },
        {
          id: 'intermediate-18',
          title: 'Business Writing - Level 1',
          description: 'Practice typing business content',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'Dear Mr. Johnson, Thank you for your inquiry dated May 15th. We are pleased to inform you that your order #12345 has been processed and will ship within 3-5 business days.'
        },
        {
          id: 'intermediate-19',
          title: 'Business Writing - Level 2',
          description: 'Advanced business writing practice',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'Please review the Q2 financial report by Friday, June 30th. The quarterly revenue increased by 15%, while expenses decreased by 7% compared to Q1 2023.'
        },
        {
          id: 'intermediate-20',
          title: 'Technical Terms - Level 1',
          description: 'Practice typing technical terminology',
          difficulty: 'hard',
          estimatedTime: '14 min',
          content: 'The CPU processes instructions from RAM. The GPU handles graphics rendering. SSD storage is faster than traditional HDD storage.'
        },
        {
          id: 'intermediate-21',
          title: 'Technical Terms - Level 2',
          description: 'Advanced technical terminology',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'IPv6 implementation requires DNS configuration. HTTPS encrypts data using TLS/SSL protocols. API endpoints must be properly authenticated.'
        },
        {
          id: 'intermediate-22',
          title: 'Academic Writing - Level 1',
          description: 'Practice typing academic content',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: 'According to the research by Smith et al. (2022), cognitive development is influenced by both genetic and environmental factors.'
        },
        {
          id: 'intermediate-23',
          title: 'Academic Writing - Level 2',
          description: 'Advanced academic writing practice',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: 'The meta-analysis revealed a statistically significant correlation (p < 0.05) between the variables, supporting the hypothesis proposed in the literature review.'
        },
        {
          id: 'intermediate-24',
          title: 'Email Composition - Level 1',
          description: 'Practice typing email content',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'Subject: Meeting Reminder\n\nHi Team,\n\nJust a reminder that we have our weekly status meeting tomorrow at 10:00 AM in Conference Room B.\n\nRegards,\nSarah'
        },
        {
          id: 'intermediate-25',
          title: 'Email Composition - Level 2',
          description: 'Advanced email composition practice',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: 'Subject: Project Update - Q3 2023\n\nDear Stakeholders,\n\nI\'m pleased to report that the project is on schedule and within budget. The development team has completed 85% of the planned deliverables for this quarter.\n\nBest regards,\nMichael Johnson'
        },
        {
          id: 'intermediate-26',
          title: 'Creative Writing - Level 1',
          description: 'Practice typing creative content',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: 'The old house stood at the end of the lane, its windows like eyes watching the passersby. In the garden, flowers danced with the gentle summer breeze.'
        },
        {
          id: 'intermediate-27',
          title: 'Creative Writing - Level 2',
          description: 'Advanced creative writing practice',
          difficulty: 'hard',
          estimatedTime: '17 min',
          content: 'As the sun dipped below the horizon, painting the sky in hues of orange and purple, she realized that this moment—this perfect, fleeting moment—was worth remembering.'
        },
        {
          id: 'intermediate-28',
          title: 'Speed Challenge - Level 1',
          description: 'Test your typing speed with common words',
          difficulty: 'hard',
          estimatedTime: '10 min',
          content: 'time year people way day man thing woman life child world school state family student group country problem hand part place case week company system program question work government number night point home water room mother area money story fact month lot right study book eye job word business issue side kind head house service friend father power hour game line end member law car city community name president team minute idea kid body information back parent face others level office door health person art war history party result change morning reason research girl guy moment air teacher force education'
        },
        {
          id: 'intermediate-29',
          title: 'Speed Challenge - Level 2',
          description: 'Advanced speed challenge with varied content',
          difficulty: 'hard',
          estimatedTime: '12 min',
          content: 'The weather forecast predicts a 70% chance of rain tomorrow with temperatures reaching a high of 68°F. Don\'t forget your umbrella! The meeting has been rescheduled to 3:45 PM in Room 302B. Please bring your laptop and the Q2 report.'
        },
        {
          id: 'intermediate-30',
          title: 'Accuracy Challenge',
          description: 'Focus on perfect accuracy with challenging content',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'In 2023, approximately 87.5% of global internet users (4.66 billion people) accessed the web via mobile devices. The average user spent 6 hours and 43 minutes online daily, with 2 hours and 27 minutes on social media platforms.'
        },
      ],
    },
    advanced: {
      title: 'Advanced Typing Lessons',
      description: 'Perfect your typing skills with these challenging exercises.',
      lessons: [
        {
          id: 'advanced-1',
          title: 'Code Snippets - JavaScript',
          description: 'Practice typing JavaScript code',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'function calculateSum(a, b) {\n  return a + b;\n}\n\nconst result = calculateSum(5, 10);\nconsole.log(`The sum is: ${result}`);'
        },
        {
          id: 'advanced-2',
          title: 'Code Snippets - HTML',
          description: 'Practice typing HTML markup',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>'
        },
        {
          id: 'advanced-3',
          title: 'Code Snippets - CSS',
          description: 'Practice typing CSS styles',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n  background-color: #f8f9fa;\n  border-radius: 8px;\n}'
        },
        {
          id: 'advanced-4',
          title: 'Code Snippets - TypeScript',
          description: 'Practice typing TypeScript code',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n  isActive: boolean;\n}\n\nfunction getUserInfo(user: User): string {\n  return `${user.name} (${user.email})`;\n}'
        },
        {
          id: 'advanced-5',
          title: 'Code Snippets - Python',
          description: 'Practice typing Python code',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: 'def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n\nresult = [fibonacci(i) for i in range(10)]\nprint(f"Fibonacci sequence: {result}")'
        },
        {
          id: 'advanced-6',
          title: 'Code Snippets - SQL',
          description: 'Practice typing SQL queries',
          difficulty: 'hard',
          estimatedTime: '14 min',
          content: 'SELECT u.name, u.email, COUNT(o.id) AS total_orders\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE u.created_at >= \'2023-01-01\'\nGROUP BY u.id\nHAVING COUNT(o.id) > 5\nORDER BY total_orders DESC;'
        },
        {
          id: 'advanced-7',
          title: 'Technical Documentation',
          description: 'Practice typing technical documentation',
          difficulty: 'hard',
          estimatedTime: '17 min',
          content: '# API Authentication\n\nAll API requests must include an `Authorization` header with a valid API key.\n\n```\nAuthorization: Bearer YOUR_API_KEY\n```\n\nRequests without valid authentication will receive a `401 Unauthorized` response.'
        },
        {
          id: 'advanced-8',
          title: 'Scientific Text',
          description: 'Practice typing scientific content',
          difficulty: 'hard',
          estimatedTime: '18 min',
          content: 'The experiment yielded a p-value of 0.032 (p < 0.05), indicating statistical significance. The mean temperature was 23.4°C (±1.2°C), while the control group maintained at 20.0°C (±0.8°C) showed no significant changes in metabolic rate (r² = 0.87).'
        },
        {
          id: 'advanced-9',
          title: 'Mathematical Expressions',
          description: 'Practice typing mathematical content',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: 'The quadratic formula x = (-b ± √(b² - 4ac)) / 2a can be derived from the standard form ax² + bx + c = 0. For the equation 3x² - 6x + 2 = 0, the discriminant b² - 4ac = 36 - 24 = 12.'
        },
        {
          id: 'advanced-10',
          title: 'Legal Text',
          description: 'Practice typing legal content',
          difficulty: 'hard',
          estimatedTime: '18 min',
          content: 'WHEREAS, the Parties entered into that certain Agreement dated January 15, 2023 (the "Agreement"); and WHEREAS, the Parties desire to amend certain provisions of the Agreement; NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties hereby agree as follows:'
        },
        {
          id: 'advanced-11',
          title: 'Medical Terminology',
          description: 'Practice typing medical content',
          difficulty: 'hard',
          estimatedTime: '17 min',
          content: 'Patient presents with acute myocardial infarction. ECG shows ST-segment elevation in leads V1-V4. Troponin levels elevated at 0.8 ng/mL. Treatment initiated with 325mg ASA, sublingual nitroglycerin, and preparation for emergency percutaneous coronary intervention.'
        },
        {
          id: 'advanced-12',
          title: 'Financial Reports',
          description: 'Practice typing financial content',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: 'Q3 2023 Financial Highlights:\n• Revenue: $24.5M (+18% YoY)\n• Gross Margin: 68.7% (vs. 65.2% in Q3 2022)\n• EBITDA: $7.2M (29.4% margin)\n• Operating Cash Flow: $5.8M\n• Net Debt to EBITDA ratio: 1.3x'
        },
        {
          id: 'advanced-13',
          title: 'Foreign Language - Spanish',
          description: 'Practice typing Spanish text',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'Buenos días. ¿Cómo estás? Me llamo Carlos y estoy aprendiendo a escribir en español. Es importante practicar con los acentos y la puntuación correcta. ¡Espero que tengas un día maravilloso!'
        },
        {
          id: 'advanced-14',
          title: 'Foreign Language - French',
          description: 'Practice typing French text',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'Bonjour! Comment ça va? Je m\'appelle Marie et j\'adore la langue française. C\'est très important de pratiquer avec les accents et la ponctuation correcte. J\'espère que vous passez une journée agréable!'
        },
        {
          id: 'advanced-15',
          title: 'Data Formats - JSON',
          description: 'Practice typing JSON data',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: '{\n  "user": {\n    "id": 12345,\n    "name": "John Smith",\n    "email": "john.smith@example.com",\n    "preferences": {\n      "theme": "dark",\n      "notifications": true,\n      "language": "en-US"\n    },\n    "lastLogin": "2023-06-15T14:22:30Z"\n  }\n}'
        },
        {
          id: 'advanced-16',
          title: 'Data Formats - CSV',
          description: 'Practice typing CSV data',
          difficulty: 'hard',
          estimatedTime: '14 min',
          content: 'id,name,email,department,salary,hire_date\n1001,"Smith, John",john.smith@company.com,Engineering,85000,2020-03-15\n1002,"Johnson, Sarah",sarah.j@company.com,Marketing,78500,2019-11-01\n1003,"Williams, David",d.williams@company.com,Finance,92000,2018-05-22'
        },
        {
          id: 'advanced-17',
          title: 'Technical Specifications',
          description: 'Practice typing technical specifications',
          difficulty: 'hard',
          estimatedTime: '17 min',
          content: 'System Requirements:\n• Processor: Intel Core i7-9700K or AMD Ryzen 7 3700X\n• Memory: 16GB DDR4-3200MHz RAM\n• Storage: 500GB NVMe SSD\n• Graphics: NVIDIA GeForce RTX 3060 Ti (8GB GDDR6)\n• Display: 27" 2560x1440 IPS, 144Hz, 1ms response time\n• Network: Wi-Fi 6 (802.11ax) + Bluetooth 5.1'
        },
        {
          id: 'advanced-18',
          title: 'Complex Formatting',
          description: 'Practice typing with complex formatting',
          difficulty: 'hard',
          estimatedTime: '18 min',
          content: '| Product ID | Name          | Category    | Price   | Stock | Status    |\n|------------|---------------|-------------|---------|-------|-----------|\n| P-1001     | Wireless Mouse| Electronics | $24.99  | 45    | Available |\n| P-1002     | USB-C Cable   | Accessories | $12.50  | 78    | Available |\n| P-1003     | Laptop Stand  | Office      | $35.75  | 0     | Backorder |'
        },
        {
          id: 'advanced-19',
          title: 'Command Line Instructions',
          description: 'Practice typing command line instructions',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: '# Install dependencies\nnpm install --save-dev typescript @types/node\n\n# Initialize TypeScript configuration\nnpx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true\n\n# Build the project\nnpm run build'
        },
        {
          id: 'advanced-20',
          title: 'Git Commands',
          description: 'Practice typing git commands',
          difficulty: 'hard',
          estimatedTime: '14 min',
          content: '# Create a new branch and switch to it\ngit checkout -b feature/user-authentication\n\n# Stage and commit changes\ngit add .\ngit commit -m "Implement user authentication flow with JWT"\n\n# Push to remote repository\ngit push origin feature/user-authentication'
        },
        {
          id: 'advanced-21',
          title: 'Complex Paragraphs',
          description: 'Practice typing complex paragraphs',
          difficulty: 'hard',
          estimatedTime: '20 min',
          content: 'The intricate relationship between technology and society has evolved dramatically over the past few decades. As digital innovations permeate every aspect of our daily lives, we\'re confronted with both unprecedented opportunities and complex ethical dilemmas. The rapid pace of technological advancement often outstrips our ability to fully comprehend its long-term implications, leading to a constant state of adaptation and reevaluation of established norms and practices.'
        },
        {
          id: 'advanced-22',
          title: 'Research Abstract',
          description: 'Practice typing a research abstract',
          difficulty: 'hard',
          estimatedTime: '18 min',
          content: 'ABSTRACT\nThis study investigates the efficacy of machine learning algorithms in predicting customer churn in subscription-based services. Using a dataset of 15,000 customer records with 24 variables, we compared the performance of Random Forest, XGBoost, and Neural Network models. Results indicate that XGBoost achieved the highest predictive accuracy (AUC = 0.89) and identified key factors influencing churn behavior. These findings have significant implications for customer retention strategies in the digital subscription economy.'
        },
        {
          id: 'advanced-23',
          title: 'Poetry and Verse',
          description: 'Practice typing poetic content',
          difficulty: 'hard',
          estimatedTime: '16 min',
          content: 'Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light.\n\nThough wise men at their end know dark is right,\nBecause their words had forked no lightning they\nDo not go gentle into that good night.'
        },
        {
          id: 'advanced-24',
          title: 'Recipe Instructions',
          description: 'Practice typing recipe instructions',
          difficulty: 'hard',
          estimatedTime: '17 min',
          content: 'Classic Tiramisu\n\nIngredients:\n• 6 egg yolks\n• 3/4 cup granulated sugar\n• 2/3 cup milk\n• 1 1/4 cups heavy cream\n• 1 tsp vanilla extract\n• 1 lb mascarpone cheese\n• 1/2 cup strong espresso, cooled\n• 2 tbsp rum (optional)\n• 24 ladyfingers\n• 2 tbsp cocoa powder\n\nInstructions:\n1. Whisk egg yolks and sugar until pale yellow.\n2. Heat milk in saucepan until simmering, then slowly add to egg mixture.'
        },
        {
          id: 'advanced-25',
          title: 'Speed Challenge - Complex',
          description: 'Advanced speed typing with complex content',
          difficulty: 'hard',
          estimatedTime: '15 min',
          content: 'The quantum computer, operating on principles of quantum mechanics, utilizes qubits instead of classical bits. While traditional computers process information in binary (0s and 1s), quantum computers leverage superposition and entanglement to perform complex calculations exponentially faster for specific problems like cryptography and molecular modeling.'
        },
        {
          id: 'advanced-26',
          title: 'Email Thread',
          description: 'Practice typing an email conversation thread',
          difficulty: 'hard',
          estimatedTime: '19 min',
          content: 'From: sarah.johnson@company.com\nTo: team@company.com\nSubject: Re: Project Timeline Update\nDate: June 15, 2023 10:42 AM\n\nHi Team,\n\nThanks for the detailed update, Michael. I agree that we should adjust the timeline given the new requirements from the client.\n\nJane - can you coordinate with the design team to ensure they can accommodate these changes? We\'ll need the revised mockups by next Wednesday at the latest.\n\nRegards,\nSarah\n\n-------- Original Message --------\nFrom: michael.chen@company.com\nTo: team@company.com\nSubject: Project Timeline Update\nDate: June 15, 2023 9:15 AM'
        },
        {
          id: 'advanced-27',
          title: 'Conference Call Notes',
          description: 'Practice typing meeting notes',
          difficulty: 'hard',
          estimatedTime: '18 min',
          content: 'Q3 Planning Meeting - June 16, 2023\nAttendees: Sarah J., Michael C., David W., Jennifer L., Robert K.\n\nAgenda Items:\n1. Q2 Performance Review\n   • Revenue exceeded targets by 12%\n   • Customer acquisition cost reduced by 8%\n   • Mobile engagement up 23% following app redesign\n\n2. Q3 Priorities\n   • Launch new pricing tier by August 15\n   • Complete API integration with 3 new partners\n   • Improve dashboard loading time by 40%\n\n3. Budget Allocation\n   • Increase marketing spend by $50K for Q3 campaign\n   • Approve hiring 2 additional developers'
        },
        {
          id: 'advanced-28',
          title: 'Markdown Documentation',
          description: 'Practice typing markdown documentation',
          difficulty: 'hard',
          estimatedTime: '17 min',
          content: '# User Authentication API\n\n## Endpoints\n\n### POST /api/auth/register\n\nCreates a new user account.\n\n**Request Body:**\n```json\n{\n  "email": "user@example.com",\n  "password": "securePassword123",\n  "name": "John Doe"\n}\n```\n\n**Response (201 Created):**\n```json\n{\n  "id": "usr_123456",\n  "email": "user@example.com",\n  "name": "John Doe",\n  "createdAt": "2023-06-15T10:30:00Z"\n}\n```'
        },
        {
          id: 'advanced-29',
          title: 'Accuracy Challenge - Advanced',
          description: 'Focus on perfect accuracy with highly complex content',
          difficulty: 'hard',
          estimatedTime: '20 min',
          content: 'In 2023, the global cybersecurity market reached $183.5 billion, with a CAGR of 12.3% projected through 2030. Approximately 43% of cyber attacks target small businesses, while 64% of companies worldwide experienced at least one form of cyber attack. The average cost of a data breach increased to $4.35 million, with the healthcare sector ($10.1M) and financial industry ($9.3M) facing the highest costs per incident.'
        },
        {
          id: 'advanced-30',
          title: 'Endurance Challenge',
          description: 'Long-form typing to build stamina and consistency',
          difficulty: 'hard',
          estimatedTime: '25 min',
          content: 'The digital transformation of the workplace has accelerated dramatically in recent years, driven by technological innovation, changing workforce expectations, and global events that necessitated remote work arrangements. Organizations across industries have had to rapidly adapt their operational models, communication strategies, and technological infrastructure to support distributed teams while maintaining productivity and corporate culture.\n\nCloud computing has emerged as a foundational technology enabling this transformation, providing scalable resources that support everything from video conferencing to collaborative document editing. Artificial intelligence and machine learning have further enhanced these capabilities, offering intelligent automation of routine tasks and providing data-driven insights that inform strategic decision-making.\n\nHowever, this digital shift presents significant challenges. Cybersecurity concerns have intensified as corporate networks extend beyond traditional boundaries. Employee well-being and work-life balance require careful consideration in environments where the line between professional and personal spaces has blurred. Additionally, organizations must navigate the complex landscape of digital tools without creating technology fatigue or fragmented workflows.\n\nSuccessful digital workplace strategies balance technological capabilities with human needs, creating systems that enhance rather than hinder productivity. They incorporate robust security measures, intuitive user experiences, and flexible architectures that can evolve alongside changing business requirements and employee expectations.'
        },
        {
          id: 'advanced-31',
          title: 'Programming Paradigms',
          description: 'Practice typing about different programming paradigms',
          difficulty: 'hard',
          estimatedTime: '18 min',
          content: 'Object-oriented programming (OOP) organizes code around objects that contain data and behavior. Functional programming treats computation as the evaluation of mathematical functions, avoiding changing state and mutable data. Procedural programming is based on the concept of procedure calls, where statements are structured into procedures. Event-driven programming is a paradigm where the flow of the program is determined by events such as user actions or sensor outputs.'
        },
        {
          id: 'advanced-32',
          title: 'Database Concepts',
          description: 'Practice typing about database systems and concepts',
          difficulty: 'hard',
          estimatedTime: '20 min',
          content: 'Relational databases organize data into tables with rows and columns, using SQL for queries. NoSQL databases provide flexible schemas for unstructured data, scaling horizontally. ACID properties (Atomicity, Consistency, Isolation, Durability) ensure reliable transaction processing. Indexing improves query performance by creating data structures that allow for quick lookup of values. Normalization reduces data redundancy while denormalization improves read performance.'
        },
        {
          id: 'advanced-33',
          title: 'Cloud Architecture',
          description: 'Practice typing about cloud computing concepts',
          difficulty: 'hard',
          estimatedTime: '22 min',
          content: 'Infrastructure as a Service (IaaS) provides virtualized computing resources over the internet. Platform as a Service (PaaS) offers hardware and software tools for application development. Software as a Service (SaaS) delivers software applications over the internet. Microservices architecture structures an application as a collection of loosely coupled services. Containerization packages applications with their dependencies, ensuring consistent operation across environments. Serverless computing allows developers to build applications without managing server infrastructure.'
        },
        {
          id: 'advanced-34',
          title: 'Cybersecurity Principles',
          description: 'Practice typing about cybersecurity concepts',
          difficulty: 'hard',
          estimatedTime: '20 min',
          content: 'The CIA triad (Confidentiality, Integrity, Availability) forms the foundation of information security. Defense in depth implements multiple layers of security controls. Zero trust architecture requires verification for all users and devices. Encryption protects data by converting it into encoded format. Multi-factor authentication combines two or more verification methods. Security by design incorporates security measures throughout the development lifecycle rather than adding them afterward.'
        },
        {
          id: 'advanced-35',
          title: 'Machine Learning Concepts',
          description: 'Practice typing about machine learning fundamentals',
          difficulty: 'hard',
          estimatedTime: '22 min',
          content: 'Supervised learning uses labeled datasets to train algorithms. Unsupervised learning identifies patterns in unlabeled data. Reinforcement learning trains agents through reward-based feedback. Neural networks are computing systems inspired by biological neural networks. Deep learning uses multiple layers of neural networks for complex pattern recognition. Overfitting occurs when a model learns the training data too well, including noise and outliers, reducing its performance on new data.'
        },
      ],
    },
  };

  const currentLevel = levelData[level] || {
    title: 'Level Not Found',
    description: 'The requested typing level does not exist.',
    lessons: [],
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Link href="/typing-levels">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Levels
            </Button>
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{currentLevel.title}</h1>
          <p className="text-muted-foreground">
            {currentLevel.description}
          </p>
        </div>

        {currentLevel.lessons.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentLevel.lessons.map((lesson) => (
              <Card key={lesson.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span>{lesson.estimatedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="capitalize">{lesson.difficulty}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link 
                    href={`/typing-levels/${level}/${lesson.id}`} 
                    className="w-full"
                  >
                    <Button className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Lesson
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">No Lessons Found</h2>
              <p className="text-muted-foreground">
                The requested level does not have any lessons available.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}