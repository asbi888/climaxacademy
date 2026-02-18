import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'sky' | 'emerald' | 'blue';
  showLabel?: boolean;
  className?: string;
  animated?: boolean;
}

const colorMap = {
  sky: 'from-brand-accent to-sky-400',
  emerald: 'from-brand-emerald to-teal-400',
  blue: 'from-blue-500 to-cyan-400',
};

const sizeMap = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'sky',
  showLabel = false,
  className,
  animated = true,
}: ProgressBarProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-brand-muted">Progress</span>
          <span className="text-xs font-semibold text-brand-text">{pct}%</span>
        </div>
      )}
      <div className={cn('w-full bg-slate-200 rounded-full overflow-hidden', sizeMap[size])}>
        <div
          className={cn(
            'h-full bg-gradient-to-r rounded-full transition-all duration-700 ease-out',
            colorMap[color],
            animated && 'animate-[progressFill_1s_ease-out]'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
