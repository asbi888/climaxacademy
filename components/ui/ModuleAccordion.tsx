'use client';

import { useState } from 'react';
import { Play, BookOpen, Dumbbell, HelpCircle, FileText, ChevronDown, Clock } from 'lucide-react';
import { cn, formatMinutes, getContentTypeLabel } from '@/lib/utils';

interface ModuleItem {
  id: number;
  title: string;
  description: string;
  order_index: number;
  duration_minutes: number;
  content_type: string;
}

interface ModuleAccordionProps {
  modules: ModuleItem[];
}

function getContentIcon(type: string) {
  switch (type) {
    case 'video':
      return Play;
    case 'reading':
      return BookOpen;
    case 'exercise':
      return Dumbbell;
    case 'quiz':
      return HelpCircle;
    default:
      return FileText;
  }
}

function getContentTypeColor(type: string): string {
  switch (type) {
    case 'video':
      return 'text-blue-400 bg-blue-400/10';
    case 'reading':
      return 'text-emerald-400 bg-emerald-400/10';
    case 'exercise':
      return 'text-orange-400 bg-orange-400/10';
    case 'quiz':
      return 'text-purple-400 bg-purple-400/10';
    default:
      return 'text-gray-400 bg-gray-400/10';
  }
}

export default function ModuleAccordion({ modules }: ModuleAccordionProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleModule = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-2">
      {modules.map((mod) => {
        const isExpanded = expandedId === mod.id;
        const Icon = getContentIcon(mod.content_type);
        const typeColor = getContentTypeColor(mod.content_type);

        return (
          <div
            key={mod.id}
            className={cn(
              'glass-card overflow-hidden transition-all duration-300',
              isExpanded && 'border-brand-accent/20 shadow-[0_0_20px_rgba(56,189,248,0.05)]'
            )}
          >
            {/* Header row */}
            <button
              onClick={() => toggleModule(mod.id)}
              className="w-full flex items-center gap-4 p-4 text-left cursor-pointer hover:bg-slate-50 transition-colors duration-200"
            >
              {/* Order number circle */}
              <div className="shrink-0 w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                <span className="text-sm font-semibold text-brand-muted">
                  {mod.order_index}
                </span>
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-brand-text truncate">
                  {mod.title}
                </h4>
              </div>

              {/* Content type badge */}
              <div className={cn('hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0', typeColor)}>
                <Icon className="w-3.5 h-3.5" />
                <span>{getContentTypeLabel(mod.content_type)}</span>
              </div>

              {/* Duration */}
              <div className="hidden sm:flex items-center gap-1 text-brand-muted shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">{formatMinutes(mod.duration_minutes)}</span>
              </div>

              {/* Chevron */}
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-brand-muted shrink-0 transition-transform duration-300',
                  isExpanded && 'rotate-180 text-brand-accent'
                )}
              />
            </button>

            {/* Expanded description */}
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-4 pb-4 pl-[4.25rem]">
                {/* Mobile-only meta row */}
                <div className="flex items-center gap-3 mb-3 sm:hidden">
                  <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', typeColor)}>
                    <Icon className="w-3.5 h-3.5" />
                    <span>{getContentTypeLabel(mod.content_type)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs">{formatMinutes(mod.duration_minutes)}</span>
                  </div>
                </div>

                <p className="text-sm text-brand-muted leading-relaxed">
                  {mod.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
