import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        'h-10 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none ring-cyan-400/70 focus:ring-2',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
