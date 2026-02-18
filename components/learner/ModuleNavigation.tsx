'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ModuleRef {
  id: number;
  title: string;
}

interface ModuleNavigationProps {
  prevModule: ModuleRef | null;
  nextModule: ModuleRef | null;
  programmeSlug: string;
}

export default function ModuleNavigation({
  prevModule,
  nextModule,
  programmeSlug,
}: ModuleNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-200">
      {prevModule ? (
        <Link
          href={`/learn/programme/${programmeSlug}/module/${prevModule.id}`}
          className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-brand-muted hover:text-brand-text transition-all duration-200 group max-w-[45%]"
        >
          <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
          <div className="text-left min-w-0">
            <span className="text-xs text-brand-muted block">Previous</span>
            <span className="text-sm font-medium truncate block">{prevModule.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextModule ? (
        <Link
          href={`/learn/programme/${programmeSlug}/module/${nextModule.id}`}
          className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-brand-muted hover:text-brand-text transition-all duration-200 group max-w-[45%] ml-auto"
        >
          <div className="text-right min-w-0">
            <span className="text-xs text-brand-muted block">Next</span>
            <span className="text-sm font-medium truncate block">{nextModule.title}</span>
          </div>
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
