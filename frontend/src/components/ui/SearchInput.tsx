import { forwardRef, InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

import { cn } from '@/utils/classnames';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ label = 'Search', hideLabel = false, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {!hideLabel && label ? (
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{label}</label>
        ) : null}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            ref={ref}
            className={cn('input-base pl-10', className)}
            placeholder="Search..."
            {...props}
          />
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
