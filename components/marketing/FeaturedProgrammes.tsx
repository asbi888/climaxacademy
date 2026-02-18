import Link from 'next/link';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

interface Programme {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  duration: string;
  modules: number;
  gradient: string;
}

const programmes: Programme[] = [
  {
    slug: 'leadership-excellence',
    category: 'Leadership',
    categoryColor: 'text-sky-600 bg-sky-50 border-sky-200',
    title: 'Leadership Excellence',
    description:
      'Develop transformational leadership skills that inspire teams, drive strategic thinking, and cultivate a culture of high performance.',
    duration: '12 weeks',
    modules: 8,
    gradient: 'from-sky-100 via-cyan-50 to-white',
  },
  {
    slug: 'effective-communication',
    category: 'Communication',
    categoryColor: 'text-blue-600 bg-blue-50 border-blue-200',
    title: 'Effective Communication',
    description:
      'Master the art of persuasive communication, active listening, and stakeholder management to influence outcomes at every level.',
    duration: '8 weeks',
    modules: 6,
    gradient: 'from-blue-100 via-indigo-50 to-white',
  },
  {
    slug: 'conflict-resolution',
    category: 'Conflict Resolution',
    categoryColor: 'text-purple-600 bg-purple-50 border-purple-200',
    title: 'Conflict Resolution & Mediation',
    description:
      'Learn proven frameworks for navigating workplace conflicts, building consensus, and turning disagreements into opportunities.',
    duration: '6 weeks',
    modules: 5,
    gradient: 'from-purple-100 via-violet-50 to-white',
  },
];

export default function FeaturedProgrammes() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Section background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,165,233,0.03) 0%, transparent 60%)',
        }}
      />

      <Container>
        {/* Section header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
            Our Programmes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text mb-4">
            Featured Programmes
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Industry-recognized training designed for Mauritius&apos;s most
            ambitious organisations. Each programme blends theory with
            real-world application.
          </p>
        </div>

        {/* Programme cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programmes.map((programme, i) => (
            <Link
              key={programme.slug}
              href={`/programmes/${programme.slug}`}
              className={cn(
                'group glass-card glass-card-hover overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-slide-up',
                `stagger-${i + 1}`
              )}
            >
              {/* Gradient thumbnail area */}
              <div
                className={cn(
                  'relative h-[200px] bg-gradient-to-br overflow-hidden',
                  programme.gradient
                )}
              >
                {/* Decorative pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 2px 2px, rgba(14,165,233,0.15) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Decorative shape */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-black/[0.02] group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-black/[0.02] group-hover:scale-110 transition-transform duration-500" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={cn(
                      'inline-block text-xs font-semibold px-3 py-1 rounded-full border',
                      programme.categoryColor
                    )}
                  >
                    {programme.category}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-brand-text mb-2 group-hover:text-brand-accent transition-colors duration-200">
                  {programme.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-5 line-clamp-3">
                  {programme.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <Clock className="w-3.5 h-3.5 text-brand-accent/60" />
                    {programme.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <BookOpen className="w-3.5 h-3.5 text-brand-accent/60" />
                    {programme.modules} Modules
                  </div>
                </div>

                {/* Link */}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-accent group-hover:gap-3 transition-all duration-200">
                  Explore Programme
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/programmes"
            className="btn-secondary text-sm px-8 py-3 inline-flex items-center gap-2"
          >
            View All Programmes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
