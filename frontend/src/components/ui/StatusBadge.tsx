import { LeadStatus } from '@/types/lead';
import { cn } from '@/utils/classnames';

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

const statusStyles: Record<LeadStatus, string> = {
  New: 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/30',
  Contacted:
    'bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-400/30',
  Qualified:
    'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-300 dark:ring-green-400/30',
  Lost: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-400/30'
};

const dotStyles: Record<LeadStatus, string> = {
  New: 'bg-blue-500',
  Contacted: 'bg-orange-500',
  Qualified: 'bg-green-500',
  Lost: 'bg-red-500'
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        statusStyles[status],
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[status])} />
      {status}
    </span>
  );
};
