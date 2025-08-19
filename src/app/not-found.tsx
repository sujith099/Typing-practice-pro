import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
        
        <div className="pt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Popular Pages
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <Link 
              href="/typing-levels" 
              className="p-3 rounded-md hover:bg-muted transition-colors"
            >
              Typing Levels
            </Link>
            <Link 
              href="/coding-practice" 
              className="p-3 rounded-md hover:bg-muted transition-colors"
            >
              Coding Practice
            </Link>
            <Link 
              href="/typing-test" 
              className="p-3 rounded-md hover:bg-muted transition-colors"
            >
              Typing Test
            </Link>
            <Link 
              href="/typing-tutor" 
              className="p-3 rounded-md hover:bg-muted transition-colors"
            >
              Typing Tutor
            </Link>
            <Link 
              href="/profile" 
              className="p-3 rounded-md hover:bg-muted transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}