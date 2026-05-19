import { ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/classnames';

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
  closeOnClick?: boolean;
}

export const DropdownMenu = ({
  trigger,
  children,
  align = 'right',
  className,
  closeOnClick = false
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>
      {open ? (
        <div
          className={cn(
            'absolute z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          onClick={closeOnClick ? () => setOpen(false) : undefined}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  destructive?: boolean;
  icon?: ReactNode;
}

export const DropdownItem = ({ children, onClick, destructive, icon }: DropdownItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors',
        destructive
          ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10'
          : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800'
      )}
    >
      {icon}
      {children}
    </button>
  );
};

export const DropdownDivider = () => (
  <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
);
