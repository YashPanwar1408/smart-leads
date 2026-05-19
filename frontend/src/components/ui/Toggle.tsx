import { cn } from '@/utils/classnames';

interface ToggleProps {
  active: boolean;
  onToggle: () => void;
  label: string;
}

export const Toggle = ({ active, onToggle, label }: ToggleProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm transition dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200',
        active && 'border-brand-500/60 text-brand-700 dark:text-brand-200'
      )}
    >
      <span
        className={cn(
          'h-3 w-3 rounded-full bg-slate-300 transition',
          active && 'bg-brand-500'
        )}
      />
      {label}
    </button>
  );
};
