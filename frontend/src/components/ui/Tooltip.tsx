import { ReactNode, useState } from 'react';

import { cn } from '@/utils/classnames';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'bottom';
  className?: string;
}

export const Tooltip = ({ content, children, side = 'top', className }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible ? (
        <div
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-zinc-700',
            side === 'top' && 'bottom-full left-1/2 mb-2 -translate-x-1/2',
            side === 'bottom' && 'left-1/2 top-full mt-2 -translate-x-1/2',
            className
          )}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
};
