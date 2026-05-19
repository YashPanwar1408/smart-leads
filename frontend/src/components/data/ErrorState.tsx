import { AlertCircle, RefreshCw } from 'lucide-react';

import { cn } from '@/utils/classnames';
import { Button } from '../ui/Button';

interface ErrorStateProps {
  title?: string;
  description: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  description,
  onRetry,
  className
}: ErrorStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-red-200/60 bg-red-50/50 px-8 py-12 text-center dark:border-red-500/20 dark:bg-red-500/5',
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
        <AlertCircle className="h-6 w-6 text-red-500" />
      </div>
      <h3 className="text-base font-semibold text-red-800 dark:text-red-300">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-red-600/80 dark:text-red-400/80">{description}</p>
      {onRetry ? (
        <Button
          variant="outline"
          className="mt-6 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-500/30 dark:text-red-300"
          onClick={onRetry}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Try again
        </Button>
      ) : null}
    </div>
  );
};
