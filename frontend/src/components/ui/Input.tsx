import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            {label}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon ? (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'input-base',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {rightIcon ? (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">{rightIcon}</span>
          ) : null}
        </div>
        {error ? <span className="text-xs text-red-500">{error}</span> : null}
        {hint && !error ? <span className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</span> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
