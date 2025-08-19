'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: Omit<NavItem, 'icon' | 'subItems'>[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    description: 'Your typing practice dashboard',
  },
  {
    title: 'Typing Practice',
    href: '/typing-levels',
    description: 'Structured typing lessons',
    subItems: [
      {
        title: 'Beginner',
        href: '/typing-levels/beginner',
        description: 'Basic typing lessons',
      },
      {
        title: 'Intermediate',
        href: '/typing-levels/intermediate',
        description: 'Intermediate typing lessons',
      },
      {
        title: 'Advanced',
        href: '/typing-levels/advanced',
        description: 'Advanced typing lessons',
      },
    ],
  },
  {
    title: 'Coding Practice',
    href: '/coding-practice',
    description: 'Language-specific coding exercises',
    subItems: [
      {
        title: 'JavaScript',
        href: '/coding-practice/javascript',
        description: 'JavaScript coding exercises',
      },
      {
        title: 'TypeScript',
        href: '/coding-practice/typescript',
        description: 'TypeScript coding exercises',
      },
      {
        title: 'Python',
        href: '/coding-practice/python',
        description: 'Python coding exercises',
      },
    ],
  },
  {
    title: 'Tests',
    href: '#',
    description: 'Test your typing and coding skills',
    subItems: [
      {
        title: 'Typing Test',
        href: '/typing-test',
        description: 'Test your typing speed and accuracy',
      },
      {
        title: 'Typing Tutor',
        href: '/typing-tutor',
        description: 'Interactive typing tutor with wind power metric',
      },
      {
        title: 'Coding Test',
        href: '/coding-test',
        description: 'Test your coding skills',
      },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const pathname = usePathname();

  // Generate breadcrumbs based on current path
  const breadcrumbs = React.useMemo(() => {
    const paths = pathname.split('/').filter(Boolean);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      return {
        title: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        href,
      };
    });
  }, [pathname]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">TypeSwift</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => {
            if (item.subItems) {
              return (
                <div key={item.title} className="relative group">
                  <button
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary',
                      pathname.startsWith(item.href) ? 'text-primary' : 'text-foreground'
                    )}
                    onClick={() => toggleSubmenu(item.title)}
                    aria-expanded={openSubmenu === item.title}
                    aria-controls={`submenu-${item.title}`}
                  >
                    {item.title}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div
                    id={`submenu-${item.title}`}
                    className={cn(
                      'absolute left-0 top-full w-48 rounded-md border bg-popover p-2 shadow-md transition-all',
                      openSubmenu === item.title ? 'visible opacity-100' : 'invisible opacity-0'
                    )}
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className={cn(
                          'block rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground',
                          pathname === subItem.href ? 'bg-accent text-accent-foreground' : ''
                        )}
                        onClick={() => setOpenSubmenu(null)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-foreground'
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="container py-2 text-sm text-muted-foreground">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.href} className="flex items-center space-x-2">
                  <span>/</span>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-foreground">{breadcrumb.title}</span>
                  ) : (
                    <Link href={breadcrumb.href} className="hover:text-foreground">
                      {breadcrumb.title}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-background p-6 pb-32 shadow-md animate-in slide-in-from-top-80 md:hidden"
        >
          <div className="relative z-20 grid gap-6 p-4 rounded-md">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {navItems.map((item) => (
                <div key={item.title} className="py-2">
                  {item.subItems ? (
                    <div className="py-2">
                      <button
                        className="flex w-full items-center justify-between font-medium transition-colors hover:text-primary"
                        onClick={() => toggleSubmenu(item.title)}
                        aria-expanded={openSubmenu === item.title}
                        aria-controls={`mobile-submenu-${item.title}`}
                      >
                        {item.title}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            openSubmenu === item.title ? 'rotate-180' : ''
                          )}
                        />
                      </button>
                      {openSubmenu === item.title && (
                        <div
                          id={`mobile-submenu-${item.title}`}
                          className="mt-2 grid gap-1 pl-4"
                        >
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className={cn(
                                'block py-2 transition-colors hover:text-primary',
                                pathname === subItem.href ? 'text-primary font-medium' : ''
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-2 font-medium transition-colors hover:text-primary',
                        pathname === item.href ? 'text-primary' : ''
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}