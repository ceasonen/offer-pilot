'use client';

import { ROUND_OPTIONS } from '@/lib/constants';
import { InterviewRound } from '@/types/interview';
import { cn } from '@/lib/utils';

interface RoundSelectorProps {
  value?: InterviewRound;
  onChange: (round: InterviewRound) => void;
}

export function RoundSelector({ value, onChange }: RoundSelectorProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {ROUND_OPTIONS.map((option) => (
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
