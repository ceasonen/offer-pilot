'use client';

import { useTimer } from '@/hooks/useTimer';
import { formatDuration } from '@/lib/utils';

interface InterviewTimerProps {
  duration: number;
  isActive: boolean;
}

export function InterviewTimer({ duration, isActive }: InterviewTimerProps) {
  const { remaining, isExpired } = useTimer({ durationMinutes: duration, active: isActive });

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">剩余时间</p>
      <p className="mt-1 text-2xl font-semibold text-slate-100">{formatDuration(remaining)}</p>
      {isExpired ? <p className="mt-1 text-xs text-rose-300">面试时间已到，可结束面试生成报告</p> : null}
    </div>
  );
}
