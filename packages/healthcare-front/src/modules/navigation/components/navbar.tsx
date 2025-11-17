import { Button } from '@/ui/components/ui/button';
import { cn } from '@/ui/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document === 'undefined') {
      return false;
    }
    return document.documentElement.classList.contains('dark');
  });

  const handleToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newDarkMode);
    }
  };

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold">Health App</span>
        <Button
          variant="outline"
          size="sm"
          className="relative h-9 w-9 p-0"
          onClick={handleToggle}
          aria-label="Toggle theme"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <Sun
              className={cn(
                'absolute h-5 w-5 transition-all duration-300 ease-out',
                isDarkMode
                  ? 'scale-0 rotate-90 opacity-0'
                  : 'scale-100 rotate-0 opacity-100'
              )}
            />
            <Moon
              className={cn(
                'absolute h-5 w-5 transition-all duration-300 ease-out',
                isDarkMode
                  ? 'scale-100 rotate-0 opacity-100'
                  : 'scale-0 -rotate-90 opacity-0'
              )}
            />
          </span>
        </Button>
      </div>
    </header>
  );
};
