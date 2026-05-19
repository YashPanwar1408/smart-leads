import { ReactNode } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/utils/classnames';
import { Button } from './Button';

interface FilterBarProps {
  children: ReactNode;
  activeCount?: number;
  onClear?: () => void;
  className?: string;
}

export const FilterBar = ({ children, activeCount = 0, onClear, className }: FilterBarProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-5 dark:border-zinc-800/80 dark:bg-zinc-900/30',
        className
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Filters</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Refine your pipeline view</p>
        </div>
        {onClear ? (
          <Button variant="ghost" size="sm" onClick={onClear} disabled={activeCount === 0}>
            Clear all
            {activeCount > 0 ? (
              <span className="ml-1.5 rounded-full bg-primary-500/10 px-1.5 py-0.5 text-xs font-semibold text-primary-600 dark:text-primary-400">
                {activeCount}
              </span>
            ) : null}
          </Button>
        ) : null}
      </div>
      {children}
    </div>
  );
};

interface FilterGroupProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const FilterGroup = ({ label, children, className }: FilterGroupProps) => {
  return (
    <div className={cn('space-y-2.5', className)}>
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

interface FilterBadgeProps {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: 'primary' | 'accent';
}

export const FilterBadge = ({ label, active, onClick, color = 'primary' }: FilterBadgeProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-150',
        active
          ? color === 'primary'
            ? 'border-primary-500/50 bg-primary-500/10 text-primary-700 shadow-sm dark:text-primary-300'
            : 'border-violet-500/50 bg-violet-500/10 text-violet-700 shadow-sm dark:text-violet-300'
          : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600'
      )}
    >
      {label}
      {active ? <X className="h-3 w-3 opacity-60" /> : null}
    </button>
  );
};

interface ActiveFilterTagProps {
  label: string;
  onRemove: () => void;
}

export const ActiveFilterTag = ({ label, onRemove }: ActiveFilterTagProps) => {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-medium text-primary-700 dark:text-primary-300">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-0.5 hover:bg-primary-500/20"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
};
