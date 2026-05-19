import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/classnames';
import { Tooltip } from './Tooltip';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  variant?: 'default' | 'danger' | 'primary';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default:
    'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200',
  danger: 'text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400',
  primary:
    'text-zinc-400 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-500/10 dark:hover:text-primary-400'
};

const sizeStyles = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9'
};

export const IconButton = ({
  icon,
  label,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: IconButtonProps) => {
  return (
    <Tooltip content={label}>
      <button
        type="button"
        aria-label={label}
        className={cn(
          'inline-flex items-center justify-center rounded-lg transition-all duration-150 active:scale-95',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    </Tooltip>
  );
};
