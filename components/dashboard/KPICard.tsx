import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: 'sky' | 'emerald' | 'blue' | 'purple';
}

const colorConfig = {
  sky: {
    iconBg: 'bg-brand-accent/10',
    iconText: 'text-brand-accent',
    trendBg: 'bg-brand-accent/10 text-brand-accent',
  },
  emerald: {
    iconBg: 'bg-brand-emerald/10',
    iconText: 'text-brand-emerald',
    trendBg: 'bg-brand-emerald/10 text-brand-emerald',
  },
  blue: {
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-400',
    trendBg: 'bg-blue-500/10 text-blue-400',
  },
  purple: {
    iconBg: 'bg-purple-500/10',
    iconText: 'text-purple-400',
    trendBg: 'bg-purple-500/10 text-purple-400',
  },
};

export default function KPICard({ title, value, icon: Icon, trend, color }: KPICardProps) {
  const colors = colorConfig[color];

  return (
    <div className="glass-card p-6 transition-all duration-300 hover:border-slate-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-brand-muted font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-brand-text tracking-tight">{value}</p>
          {trend && (
            <span
              className={cn(
                'inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-semibold',
                colors.trendBg
              )}
            >
              {trend}
            </span>
          )}
        </div>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
            colors.iconBg
          )}
        >
          <Icon className={cn('w-6 h-6', colors.iconText)} />
        </div>
      </div>
    </div>
  );
}
