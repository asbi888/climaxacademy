'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Container from '@/components/ui/Container';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Layered gradient background ── */}
      <div className="absolute inset-0 bg-brand-bg" />

      {/* Radial gradients for depth - subtle sky blue glows on light bg */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(14,165,233,0.03) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(14,165,233,0.03) 0%, transparent 50%)',
        }}
      />

      {/* ── Animated gradient orbs - subtle light blue tints ── */}
      <div
        className={`absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-1000 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className={`absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] transition-opacity duration-1000 delay-300 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] transition-opacity duration-1000 delay-500 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite',
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ── */}
      <Container size="default" className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo icon */}
          <div
            className={`mb-8 transition-all duration-700 ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <Logo variant="icon" size="md" linkTo="/" />
          </div>

          {/* Main headline */}
          <h1
            className={`font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6 transition-all duration-700 delay-100 ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-brand-text">Transform Your Workforce.</span>
            <br />
            <span className="text-gradient">Elevate Performance.</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-brand-muted max-w-2xl mb-10 leading-relaxed transition-all duration-700 delay-200 ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            Premium corporate training programmes designed to unlock potential,
            build leaders, and drive measurable results across Mauritius.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-300 ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <Link
              href="/programmes"
              className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2"
            >
              Explore Programmes
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="btn-secondary text-base px-8 py-3.5 inline-flex items-center gap-2"
            >
              Book a Demo
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className={`mt-16 md:mt-24 transition-all duration-700 delay-500 ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex flex-col items-center gap-2 text-brand-muted/50">
              <span className="text-xs tracking-widest uppercase">
                Scroll to explore
              </span>
              <div className="w-5 h-8 rounded-full border border-slate-200 flex items-start justify-center p-1">
                <div
                  className="w-1 h-2 rounded-full bg-brand-accent/60"
                  style={{ animation: 'float 2s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-bg to-transparent" />
    </section>
  );
}
