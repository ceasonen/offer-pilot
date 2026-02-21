import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  const width = `${Math.max(0, Math.min(100, value))}%`;

  return (
    <div className={cn('h-2 w-full rounded-full bg-slate-800', className)}>
      <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width }} />
    </div>
  );
}
