import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-[0_10px_40px_-25px_rgba(34,211,238,0.5)]',
        className,
      )}
      {...props}
    />
  );
}
