'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface UseTimerOptions {
  durationMinutes: number;
  active: boolean;
}

export function useTimer({ durationMinutes, active }: UseTimerOptions) {
  const durationSeconds = useMemo(() => durationMinutes * 60, [durationMinutes]);
  const [remaining, setRemaining] = useState(durationSeconds);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setRemaining(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    if (!active) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [active]);

  return {
    remaining,
    elapsed: Math.max(durationSeconds - remaining, 0),
    isExpired: remaining === 0,
  };
}
