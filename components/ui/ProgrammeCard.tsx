import Link from 'next/link';
import { Clock, BookOpen, Award } from 'lucide-react';
import { cn, formatDuration, getCategoryColor } from '@/lib/utils';
import DifficultyBadge from '@/components/ui/DifficultyBadge';

interface ProgrammeCardProps {
  programme: {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    category: string;
    duration_hours: number;
    module_count: number;
    difficulty_level: string;
    thumbnail_gradient: string;
    is_certified: number;
  };
}

export default function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const categoryColor = getCategoryColor(programme.category);

  return (
    <Link href={`/programmes/${programme.slug}`} className="group block">
      <div className="glass-card overflow-hidden transition-all duration-300 group-hover:border-brand-accent/20 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.08)] group-hover:-translate-y-1">
        {/* Thumbnail gradient area */}
        <div
          className="relative h-48 overflow-hidden"
          style={{ background: programme.thumbnail_gradient }}
        >
          {/* Gradient overlay at bottom for smooth text transition */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm',
                categoryColor
              )}
            >
              {programme.category}
            </span>
          </div>

          {/* Certificate icon */}
          {programme.is_certified === 1 && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-accent/20 backdrop-blur-sm border border-brand-accent/30">
                <Award className="w-3.5 h-3.5 text-brand-accent" />
                <span className="text-[10px] font-semibold text-brand-accent">Certified</span>
              </div>
            </div>
          )}
        </div>

        {/* Content area */}
        <div className="p-5 space-y-3">
          {/* Title */}
          <h3 className="font-serif text-lg text-brand-text group-hover:text-brand-accent transition-colors duration-200 leading-tight">
            {programme.title}
          </h3>

          {/* Short description */}
          <p className="text-sm text-brand-muted leading-relaxed line-clamp-2">
            {programme.short_description}
          </p>

          {/* Meta info row */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-brand-muted">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{formatDuration(programme.duration_hours)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-brand-muted">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-xs">{programme.module_count} modules</span>
            </div>
          </div>

          {/* Bottom row: difficulty + explore link */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <DifficultyBadge level={programme.difficulty_level} />
            <span className="text-sm font-semibold text-brand-accent group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
              Explore Programme
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
