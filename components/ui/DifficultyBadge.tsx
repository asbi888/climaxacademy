import { cn, getDifficultyColor } from '@/lib/utils';

interface DifficultyBadgeProps {
  level: string;
  className?: string;
}

export default function DifficultyBadge({ level, className }: DifficultyBadgeProps) {
  const colorClasses = getDifficultyColor(level);
  const label = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colorClasses,
        className
      )}
    >
      {label}
    </span>
  );
}
