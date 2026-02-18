'use client';

import { useState } from 'react';
import CategoryFilter from '@/components/ui/CategoryFilter';
import ProgrammeCard from '@/components/ui/ProgrammeCard';

interface Programme {
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
}

interface ProgrammeCatalogueClientProps {
  programmes: Programme[];
  categories: string[];
}

export default function ProgrammeCatalogueClient({
  programmes,
  categories,
}: ProgrammeCatalogueClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered =
    selectedCategory === 'All'
      ? programmes
      : programmes.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Category filter */}
      <div className="mb-10">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* Programme count */}
      <div className="mb-6">
        <p className="text-sm text-brand-muted">
          Showing{' '}
          <span className="font-semibold text-brand-text">{filtered.length}</span>{' '}
          programme{filtered.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && (
            <>
              {' '}in{' '}
              <span className="font-semibold text-brand-accent">{selectedCategory}</span>
            </>
          )}
        </p>
      </div>

      {/* Programme grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((programme, index) => (
            <div
              key={programme.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <ProgrammeCard programme={programme} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.331 0 4.467.89 6.064 2.346M12 6.042c1.597-1.456 3.733-2.346 6.064-2.346.938 0 1.948.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.331 0-4.467.89-6.064 2.346M12 6.042V20.346" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-brand-text mb-2">No programmes found</h3>
          <p className="text-sm text-brand-muted">
            Try selecting a different category to find what you are looking for.
          </p>
        </div>
      )}
    </>
  );
}
