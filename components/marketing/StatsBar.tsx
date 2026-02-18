'use client';

import { useEffect, useRef, useState } from 'react';
import Container from '@/components/ui/Container';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 500, suffix: '+', label: 'Professionals Trained' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
  { value: 15, suffix: '+', label: 'Corporate Partners' },
  { value: 6, suffix: '', label: 'Certified Programmes' },
];

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [target, isVisible, duration]);

  return count;
}

function StatCounter({
  stat,
  isVisible,
}: {
  stat: StatItem;
  isVisible: boolean;
}) {
  const count = useCountUp(stat.value, isVisible);

  return (
    <div className="flex flex-col items-center gap-1 px-4 py-3">
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-accent tabular-nums">
        {isVisible ? count : 0}
        <span className="text-brand-accent-light">{stat.suffix}</span>
      </span>
      <span className="text-xs md:text-sm text-brand-muted tracking-wide uppercase">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-8 md:py-12">
      {/* Subtle top/bottom borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 bg-brand-bg-light/50" />

      <Container>
        <div
          className={`glass-card px-6 py-8 md:py-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="relative">
                <StatCounter stat={stat} isVisible={isVisible} />
                {/* Divider between items (hidden on last) */}
                {i < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
