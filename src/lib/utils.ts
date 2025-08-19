import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function calculateWPM(totalChars: number, timeInMinutes: number): number {
  // Average word length is considered to be 5 characters
  const words = totalChars / 5;
  if (timeInMinutes === 0) return 0;
  return Math.round(words / timeInMinutes);
}

export function calculateAccuracy(targetText: string, userInput: string): number {
  if (userInput.length === 0) return 100;
  
  let correctChars = 0;
  const minLength = Math.min(targetText.length, userInput.length);
  
  for (let i = 0; i < minLength; i++) {
    if (targetText[i] === userInput[i]) {
      correctChars++;
    }
  }
  
  return Math.round((correctChars / userInput.length) * 100);
}