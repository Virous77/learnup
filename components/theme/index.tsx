'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="bg-default-100 hover:bg-default-200 flex cursor-pointer items-center justify-center"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun size={20} data-testid="sun" />
      ) : (
        <Moon size={20} data-testid="moon" />
      )}
    </div>
  );
};

export default ThemeSwitcher;
