import { ReactNode } from 'react';

import { cn } from '@/utils/classnames';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base'
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getColorFromName = (name: string): string => {
  const colors = [
    'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
    'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    'bg-orange-500/15 text-orange-600 dark:text-orange-400',
    'bg-pink-500/15 text-pink-600 dark:text-pink-400'
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index] ?? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400';
};

export const Avatar = ({ name, size = 'md', className }: AvatarProps) => {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-semibold',
        sizeStyles[size],
        getColorFromName(name),
        className
      )}
      aria-hidden
    >
      {getInitials(name)}
    </div>
  );
};

interface AvatarGroupProps {
  names: string[];
  max?: number;
}

export const AvatarGroup = ({ names, max = 4 }: AvatarGroupProps) => {
  const visible = names.slice(0, max);
  const remaining = names.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((name) => (
        <Avatar key={name} name={name} size="sm" className="ring-2 ring-white dark:ring-zinc-900" />
      ))}
      {remaining > 0 ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 ring-2 ring-white dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-900">
          +{remaining}
        </div>
      ) : null}
    </div>
  );
};
