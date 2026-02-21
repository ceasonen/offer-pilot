import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none ring-cyan-400/70 placeholder:text-slate-500 focus:ring-2',
        className,
      )}
      {...props}
    />
  );
});
