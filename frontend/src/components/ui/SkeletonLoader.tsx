import { cn } from '@/utils/classnames';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80',
        className
      )}
    />
  );
};

interface SkeletonLoaderProps {
  rows?: number;
  className?: string;
}

export const SkeletonLoader = ({ rows = 5, className }: SkeletonLoaderProps) => {
  return (
    <div className={cn('space-y-3', className)}>
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>
  );
};

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export const TableSkeleton = ({ columns = 5, rows = 6 }: TableSkeletonProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex gap-4 border-b border-zinc-200 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/80">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-4 px-4 py-4">
            <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
            {Array.from({ length: columns - 1 }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
