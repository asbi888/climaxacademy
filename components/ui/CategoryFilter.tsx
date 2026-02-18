'use client';

import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  const allCategories = ['All', ...categories];

  return (
    <div className="relative">
      {/* Fade edges for scroll indication */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none md:hidden" />

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 px-1 -mx-1 md:flex-wrap md:overflow-visible">
        {allCategories.map((category) => {
          const isActive = selected === category;
          return (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={cn(
                'shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border whitespace-nowrap',
                isActive
                  ? 'bg-brand-accent text-white border-brand-accent shadow-lg shadow-brand-accent/20'
                  : 'bg-slate-100 text-brand-muted border-slate-200 hover:text-brand-text hover:bg-slate-200 hover:border-slate-300'
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
