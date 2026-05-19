import { ButtonHTMLAttributes, ReactNode, cloneElement, isValidElement } from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@/utils/classnames';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-zinc-950';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-primary text-white shadow-glow hover:shadow-glow-lg hover:brightness-110 active:scale-[0.98]',
  secondary:
    'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
  outline:
    'border border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800/60',
  ghost: 'bg-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
  icon: 'h-9 w-9 p-0'
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  asChild,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const styles = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn((children.props as { className?: string }).className, styles),
      children: (
        <>
          {leftIcon}
          {(children.props as { children?: ReactNode }).children}
          {rightIcon}
        </>
      )
    });
  }

  return (
    <button className={styles} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};
