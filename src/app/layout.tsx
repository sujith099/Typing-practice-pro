import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { JetBrains_Mono as FontMono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'TypeSwift - Improve Your Typing Skills',
  description: 'Practice typing and coding with TypeSwift, a modern typing practice application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © {new Date().getFullYear()} TypeSwift. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}