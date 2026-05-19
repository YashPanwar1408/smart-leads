import { ReactNode } from 'react';

import { cn } from '@/utils/classnames';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

export const Card = ({ children, className, padding = 'md', hover = false }: CardProps) => {
  return (
    <div
      className={cn(
        'card-base',
        paddingStyles[padding],
        hover && 'transition-shadow duration-200 hover:shadow-soft',
        className
      )}
    >
      {children}
    </div>
  );
};
