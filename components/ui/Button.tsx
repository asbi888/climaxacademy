import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary: 'bg-gradient-to-r from-brand-accent to-sky-600 text-white hover:shadow-lg hover:shadow-brand-accent/20 hover:-translate-y-0.5',
  secondary: 'bg-brand-emerald text-white hover:bg-emerald-400 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-brand-muted hover:text-brand-text hover:bg-slate-50',
  outline: 'bg-transparent border border-slate-300 text-brand-text hover:border-brand-accent hover:text-brand-accent',
  danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
};

const sizes = {
  sm: 'text-sm px-3 py-1.5 rounded-lg',
  md: 'text-sm px-5 py-2.5 rounded-xl',
  lg: 'text-base px-7 py-3.5 rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
