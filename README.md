# TypeScript Typing Practice Application

## Overview

This is a Next.js 14 application designed to help users improve their typing speed and accuracy, with a special focus on coding-related typing practice. The application features a modern UI built with Tailwind CSS and includes theme switching capabilities.

## Features

- **Theme Switching**: Toggle between light and dark modes
- **Typing Practice**: Various levels of typing exercises (beginner, intermediate, advanced)
- **Coding Practice**: Language-specific typing exercises for JavaScript, TypeScript, and Python
- **Performance Tracking**: Track WPM (words per minute), accuracy, and progress over time
- **User Profiles**: Save your progress and view your statistics
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── coding-practice/  # Coding practice pages
│   ├── dashboard/        # User dashboard
│   ├── login/            # Authentication pages
│   ├── profile/          # User profile
│   ├── typing-levels/    # Typing practice levels
│   ├── typing-test/      # Typing speed test
│   └── page.tsx          # Landing page
├── components/           # Reusable components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── header.tsx        # Site header with navigation
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx  # Theme toggle button
└── lib/                  # Utility functions
    └── utils.ts          # Helper functions
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI components
- **Lucide React**: Icon library
- **next-themes**: Theme management

## Features in Detail

### Typing Practice

The application offers structured typing practice with progressive difficulty levels:

- **Beginner**: Basic typing exercises focusing on common words and simple sentences
- **Intermediate**: More complex sentences and paragraphs with varied punctuation
- **Advanced**: Challenging texts with specialized vocabulary and complex structures

### Coding Practice

Specialized typing exercises for programmers:

- **JavaScript**: Practice typing JavaScript syntax, functions, and modern ES6+ features
- **TypeScript**: Type definitions, interfaces, generics, and other TypeScript-specific syntax
- **Python**: Python syntax with proper indentation and language-specific constructs

### Performance Metrics

Detailed statistics to track your progress:

- Words per minute (WPM)
- Accuracy percentage
- Time spent practicing
- Progress through different levels
- Historical performance data

## License

MIT