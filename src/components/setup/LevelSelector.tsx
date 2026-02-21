'use client';

import { LEVEL_OPTIONS } from '@/lib/constants';
import { Level } from '@/types/interview';
import { cn } from '@/lib/utils';

interface LevelSelectorProps {
  value?: Level;
  onChange: (level: Level) => void;
}

export function LevelSelector({ value, onChange }: LevelSelectorProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {LEVEL_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={cn(
            'rounded-xl border p-3 text-left transition',
            value === option.value
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-slate-800 bg-slate-900/60 hover:border-slate-600',
          )}
          onClick={() => onChange(option.value)}
        >
          <p className="text-sm font-medium text-slate-100">{option.label}</p>
          <p className="mt-1 text-xs text-slate-400">{option.description}</p>
        </button>
      ))}
    </div>
  );
}
