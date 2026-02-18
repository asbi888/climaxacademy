'use client';

import { useEffect, useState, useCallback } from 'react';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Climax Academy transformed our leadership pipeline. The programmes are engaging, practical, and our managers have shown measurable improvement.',
    name: 'Anil D.',
    role: 'HR Director',
    company: 'Rogers Capital',
  },
  {
    quote:
      'The analytics dashboard gives us real-time visibility into training ROI. It\u2019s exactly what we needed to justify our L&D investment.',
    name: 'Fatima J.',
    role: 'Head of L&D',
    company: 'IBL Group',
  },
  {
    quote:
      'Our team\u2019s communication and conflict resolution skills have improved dramatically. The interactive modules make learning enjoyable.',
    name: 'Philippe N.',
    role: 'CPO',
    company: 'MCB Group',
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section className="relative py-24 md:py-32">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(14,165,233,0.03) 0%, transparent 70%)',
        }}
      />

      <Container size="narrow" className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text">
            What Leaders Say
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial card */}
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Large quotation mark */}
            <div className="absolute top-4 left-6 md:top-6 md:left-10 pointer-events-none select-none">
              <span className="text-7xl md:text-8xl font-serif text-brand-accent/10 leading-none">
                &ldquo;
              </span>
            </div>

            {/* Testimonial content with transition */}
            <div className="relative z-10 min-h-[200px] flex flex-col items-center justify-center">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className={cn(
                    'absolute inset-0 flex flex-col items-center justify-center transition-all duration-500',
                    i === current
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  )}
                >
                  <p className="text-lg md:text-xl text-brand-text/90 leading-relaxed mb-8 max-w-2xl italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex flex-col items-center gap-1">
                    {/* Sky accent line */}
                    <div className="w-8 h-0.5 bg-brand-accent rounded-full mb-3" />
                    <span className="text-sm font-semibold text-brand-text">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-brand-muted">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Closing quotation mark */}
            <div className="absolute bottom-4 right-6 md:bottom-6 md:right-10 pointer-events-none select-none">
              <span className="text-7xl md:text-8xl font-serif text-brand-accent/10 leading-none">
                &rdquo;
              </span>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  i === current
                    ? 'w-8 h-2 bg-brand-accent'
                    : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
