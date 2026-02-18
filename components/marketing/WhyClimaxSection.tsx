import { Award, Users, BarChart3, Layers } from 'lucide-react';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

interface ValueProp {
  icon: React.ElementType;
  title: string;
  description: string;
}

const valueProps: ValueProp[] = [
  {
    icon: Award,
    title: 'Certified Programmes',
    description:
      'Industry-recognized certifications that validate your team\u2019s skills and advance their professional standing.',
  },
  {
    icon: Users,
    title: 'Expert Facilitators',
    description:
      'Led by seasoned professionals with 15+ years of corporate training experience across diverse industries.',
  },
  {
    icon: BarChart3,
    title: 'Measurable Impact',
    description:
      'Track progress, measure ROI, and demonstrate training effectiveness with our analytics dashboard.',
  },
  {
    icon: Layers,
    title: 'Blended Learning',
    description:
      'Combining video, exercises, quizzes, and real-world application for maximum knowledge retention.',
  },
];

export default function WhyClimaxSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-brand-bg-light/30" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(14,165,233,0.04) 0%, transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
            Our Difference
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text mb-4">
            Why Climax Academy?
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            We combine world-class content with cutting-edge technology to
            deliver training that truly transforms organisations.
          </p>
        </div>

        {/* Value prop cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, i) => {
            const Icon = prop.icon;
            return (
              <div
                key={prop.title}
                className={cn(
                  'group glass-card glass-card-hover p-6 text-center transition-all duration-300 animate-slide-up',
                  `stagger-${i + 1}`
                )}
              >
                {/* Icon container */}
                <div className="relative mx-auto mb-5 w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent/15 group-hover:border-brand-accent/30 transition-all duration-300">
                  <Icon className="w-6 h-6 text-brand-accent" />

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-brand-accent/20" />
                </div>

                {/* Text content */}
                <h3 className="font-serif text-lg text-brand-text mb-2 group-hover:text-brand-accent transition-colors duration-200">
                  {prop.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
