import { ReactNode } from 'react';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

import { cn } from '@/utils/classnames';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  gradient?: 'indigo' | 'violet' | 'green' | 'orange' | 'red' | 'blue';
  className?: string;
  loading?: boolean;
}

const gradientStyles = {
  indigo: 'from-indigo-500/10 to-violet-500/5 dark:from-indigo-500/20 dark:to-violet-500/10',
  violet: 'from-violet-500/10 to-purple-500/5 dark:from-violet-500/20 dark:to-purple-500/10',
  green: 'from-green-500/10 to-emerald-500/5 dark:from-green-500/20 dark:to-emerald-500/10',
  orange: 'from-orange-500/10 to-amber-500/5 dark:from-orange-500/20 dark:to-amber-500/10',
  red: 'from-red-500/10 to-rose-500/5 dark:from-red-500/20 dark:to-rose-500/10',
  blue: 'from-blue-500/10 to-cyan-500/5 dark:from-blue-500/20 dark:to-cyan-500/10'
};

const iconStyles = {
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
  orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
};

export const DashboardCard = ({
  title,
  value,
  icon: Icon,
  trend,
  gradient = 'indigo',
  className,
  loading = false
}: DashboardCardProps) => {
  const isPositive = trend && trend.value >= 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-br p-5 shadow-card transition-shadow duration-200 hover:shadow-soft dark:border-zinc-800/80 dark:bg-zinc-900',
        gradientStyles[gradient],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          ) : (
            <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{value}</p>
          )}
          {trend && !loading ? (
            <div className="flex items-center gap-1.5 text-xs">
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span className={cn('font-medium', isPositive ? 'text-green-600' : 'text-red-500')}>
                {Math.abs(trend.value)}%
              </span>
              <span className="text-zinc-400">{trend.label}</span>
            </div>
          ) : null}
        </div>
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110',
            iconStyles[gradient]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
};

interface DashboardCardGridProps {
  children: ReactNode;
  className?: string;
}

export const DashboardCardGrid = ({ children, className }: DashboardCardGridProps) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5', className)}>
      {children}
    </div>
  );
};
