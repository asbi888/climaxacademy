'use client';

import { Play } from 'lucide-react';

interface VideoPlaceholderProps {
  gradient?: string;
}

export default function VideoPlaceholder({ gradient }: VideoPlaceholderProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16/9' }}>
      {/* Dark background with subtle gradient tinting */}
      <div
        className="absolute inset-0 bg-brand-bg-light"
        style={{
          background: gradient
            ? `linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,41,59,0.95)), ${gradient}`
            : undefined,
        }}
      />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 opacity-20" style={{ background: gradient || 'linear-gradient(135deg, #38BDF8, #0EA5E9)' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Grid pattern decoration */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Centered play button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-brand-accent/20 backdrop-blur-sm border border-brand-accent/30 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer group">
          <Play className="w-8 h-8 text-brand-accent group-hover:text-sky-300 transition-colors ml-1" />
        </div>
        <p className="text-sm text-white/50 font-medium">
          Video content — available in full programme
        </p>
      </div>

      {/* Bottom controls placeholder */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-brand-accent rounded-full" />
          </div>
          <span className="text-xs text-white/30 font-mono">0:00</span>
        </div>
      </div>
    </div>
  );
}
