'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const THEME_KEY = 'offer-pilot:theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    document.documentElement.dataset.theme = next;
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle}>
      {theme === 'dark' ? '浅色模式' : '深色模式'}
    </Button>
  );
}
