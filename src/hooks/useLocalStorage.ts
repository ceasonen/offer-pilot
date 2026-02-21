'use client';

import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = (next: T) => {
    setValue(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  return [value, updateValue] as const;
}
