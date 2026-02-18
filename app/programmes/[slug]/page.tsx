import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
  Target,
  Sparkles,
} from 'lucide-react';
import { getDb } from '@/db';
import type { Programme, Module } from '@/db';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Container from '@/components/ui/Container';
import DifficultyBadge from '@/components/ui/DifficultyBadge';
import ModuleAccordion from '@/components/ui/ModuleAccordion';
import ProgrammeCard from '@/components/ui/ProgrammeCard';
import { cn, formatDuration, getCategoryColor } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Learning outcomes per category
   ───────────────────────────────────────────── */
const categoryLearningOutcomes: Record<string, string[]> = {
  Leadership: [
    'Develop a personal leadership style grounded in self-awareness and emotional intelligence',
    'Master techniques for motivating and inspiring diverse teams towards shared goals',
    'Build strategic thinking capabilities for effective organisational decision-making',
    'Learn frameworks for navigating change and leading through uncertainty',
    'Cultivate coaching and mentoring skills to develop future leaders',
    'Strengthen your executive presence and stakeholder communication',
  ],
  Communication: [
    'Master persuasive communication techniques for professional contexts',
    'Develop active listening skills that build trust and strengthen relationships',
    'Learn to deliver impactful presentations with confidence and clarity',
    'Navigate difficult conversations with diplomacy and assertiveness',
    'Adapt communication styles for diverse audiences and cultural contexts',
    'Build skills for clear, concise written communication in business settings',
  ],
  'Conflict Resolution': [
    'Understand the root causes and dynamics of workplace conflict',
    'Master mediation frameworks for resolving disputes between team members',
    'Develop skills for transforming conflict into productive dialogue',
    'Learn de-escalation techniques for high-tension situations',
    'Build capacity for creating psychologically safe work environments',
    'Apply negotiation strategies that achieve win-win outcomes',
  ],
  'Emotional Intelligence': [
    'Develop deep self-awareness and understand your emotional triggers',
    'Master self-regulation techniques for maintaining composure under pressure',
    'Build empathy skills that enhance interpersonal relationships',
    'Learn to read social dynamics and navigate complex team environments',
    'Apply emotional intelligence frameworks to leadership and decision-making',
    'Cultivate resilience and emotional agility for sustained well-being',
  ],
  'Team Building': [
    'Understand team dynamics and the stages of high-performance team development',
    'Master facilitation techniques that foster collaboration and innovation',
    'Build trust-based relationships that strengthen team cohesion',
    'Learn strategies for managing remote and hybrid team engagement',
    'Develop skills for aligning diverse perspectives towards common objectives',
    'Create accountability frameworks that drive consistent team performance',
  ],
};

const defaultLearningOutcomes = [
  'Gain practical knowledge through expert-led interactive sessions',
  'Develop core professional competencies applicable to any industry',
  'Build confidence through hands-on exercises and real-world scenarios',
  'Earn a recognised certificate upon successful completion',
  'Access frameworks and tools you can apply immediately in your role',
  'Join a network of professionals committed to continuous growth',
];

/* ─────────────────────────────────────────────
   Who-this-is-for descriptions per category
   ───────────────────────────────────────────── */
const categoryAudience: Record<string, string> = {
  Leadership:
    'This programme is ideal for emerging leaders, senior managers, and executives who want to sharpen their leadership capabilities and drive team performance. Whether you are stepping into a leadership role for the first time or looking to refine your approach, this programme provides the tools and frameworks to lead with impact.',
  Communication:
    'Designed for professionals at every level who want to communicate with greater clarity, confidence, and influence. This programme is especially valuable for managers, client-facing teams, and anyone whose success depends on the ability to connect, persuade, and inspire through words.',
  'Conflict Resolution':
    'Perfect for HR professionals, team leads, and managers who regularly navigate workplace disagreements. This programme equips you with proven frameworks to address tension constructively, whether you are mediating between colleagues or handling a challenging stakeholder relationship.',
  'Emotional Intelligence':
    'This programme is tailored for professionals who recognise that technical expertise alone is not enough. It is ideal for leaders, managers, and individual contributors who want to deepen their self-awareness, strengthen their relationships, and perform at their best under pressure.',
  'Team Building':
    'Built for team leads, project managers, and organisational development professionals who are responsible for creating cohesive, high-performing teams. Whether your teams are co-located, remote, or hybrid, this programme gives you the strategies to build trust and alignment.',
};

const defaultAudience =
  'This programme is designed for professionals across all levels who are committed to developing their soft skills and driving meaningful results within their organisations. No prior experience is required -- just a willingness to learn and grow.';

/* ─────────────────────────────────────────────
   Metadata generation
   ───────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const db = getDb();
  const programme = db
    .prepare('SELECT title, short_description FROM programmes WHERE slug = ?')
    .get(slug) as { title: string; short_description: string } | undefined;

  if (!programme) {
    return { title: 'Programme Not Found | Climax Academy' };
  }

  return {
    title: `${programme.title} | Climax Academy`,
    description: programme.short_description,
  };
}

/* ─────────────────────────────────────────────
   Page component
   ───────────────────────────────────────────── */
export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = getDb();

  const programme = db
    .prepare('SELECT * FROM programmes WHERE slug = ?')
    .get(slug) as Programme | undefined;

  if (!programme) {
    notFound();
  }

  const modules = db
    .prepare('SELECT * FROM modules WHERE programme_id = ? ORDER BY order_index')
    .all(programme.id) as Module[];

  const relatedProgrammes = db
    .prepare(
      'SELECT * FROM programmes WHERE category = ? AND id != ? ORDER BY id LIMIT 3'
    )
    .all(programme.category, programme.id) as Programme[];

  const learningOutcomes =
    categoryLearningOutcomes[programme.category] || defaultLearningOutcomes;

  const audienceDescription =
    categoryAudience[programme.category] || defaultAudience;

  const categoryColor = getCategoryColor(programme.category);

  const totalMinutes = modules.reduce((sum, m) => sum + m.duration_minutes, 0);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      {/* ── Gradient hero header ── */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden"
        style={{ background: programme.thumbnail_gradient }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg" />

        <Container className="relative z-10">
          {/* Back link */}
          <Link
            href="/programmes"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Catalogue
          </Link>

          {/* Category badge */}
          <div className="mb-4">
            <span
              className={cn(
                'inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm',
                categoryColor
              )}
            >
              {programme.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-3xl leading-tight">
            {programme.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
            {programme.short_description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
              <Clock className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-white">
                {formatDuration(programme.duration_hours)}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
              <BookOpen className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-white">
                {programme.module_count} modules
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
              <Target className="w-4 h-4 text-brand-accent" />
              <DifficultyBadge level={programme.difficulty_level} />
            </div>
            {programme.is_certified === 1 && (
              <div className="flex items-center gap-2 bg-brand-accent/20 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-brand-accent/30">
                <Award className="w-4 h-4 text-brand-accent" />
                <span className="text-sm font-semibold text-brand-accent">
                  Certificate Included
                </span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Main content ── */}
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left column: main content */}
          <div className="lg:col-span-2 space-y-16">
            {/* What You'll Learn */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-brand-accent" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-text">
                  What You&apos;ll Learn
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-accent/20 transition-colors duration-200"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                    <p className="text-sm text-brand-muted leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Programme Modules */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-brand-text">
                    Programme Modules
                  </h2>
                  <p className="text-sm text-brand-muted mt-0.5">
                    {modules.length} modules &middot; {formatDuration(programme.duration_hours)} total
                  </p>
                </div>
              </div>

              <ModuleAccordion modules={modules} />
            </section>

            {/* Who This Is For */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-brand-accent" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-text">
                  Who This Is For
                </h2>
              </div>

              <div className="glass-card p-6">
                <p className="text-brand-muted leading-relaxed">
                  {audienceDescription}
                </p>
              </div>
            </section>
          </div>

          {/* Right column: sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Price & CTA card */}
              <div className="glass-card p-6 space-y-6 border-brand-accent/10">
                {/* Price */}
                {programme.price_per_person > 0 && (
                  <div>
                    <p className="text-sm text-brand-muted mb-1">Price per person</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-brand-text">
                        Rs {programme.price_per_person.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Key highlights */}
                <div className="space-y-3 py-4 border-y border-slate-200">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm text-brand-muted">
                      {formatDuration(programme.duration_hours)} of content
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm text-brand-muted">
                      {programme.module_count} structured modules
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm text-brand-muted">
                      Expert facilitator-led sessions
                    </span>
                  </div>
                  {programme.is_certified === 1 && (
                    <div className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-brand-accent" />
                      <span className="text-sm text-brand-muted">
                        Certificate of completion
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA button */}
                <Link
                  href="/contact"
                  className="btn-primary w-full text-center block text-base py-3.5"
                >
                  Enroll Your Team
                </Link>

                <p className="text-xs text-brand-muted text-center">
                  Group discounts available for teams of 10+
                </p>
              </div>

              {/* Facilitator card */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-brand-accent" />
                  </div>
                  <h3 className="font-serif text-lg text-brand-text">
                    Led by Expert Facilitators
                  </h3>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/logocl.png"
                      alt="Climax Academy"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-text">
                      Climax Academy Faculty
                    </p>
                    <p className="text-xs text-brand-muted">
                      Certified Training Professionals
                    </p>
                  </div>
                </div>

                <p className="text-sm text-brand-muted leading-relaxed">
                  Our programmes are delivered by industry-certified facilitators with
                  extensive experience in corporate training across Mauritius and the
                  Indian Ocean region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Related Programmes ── */}
      {relatedProgrammes.length > 0 && (
        <section className="pb-24">
          <Container>
            <div className="border-t border-slate-200 pt-16">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-brand-text">
                    Related Programmes
                  </h2>
                  <p className="text-sm text-brand-muted mt-1">
                    More in {programme.category}
                  </p>
                </div>
                <Link
                  href="/programmes"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:text-brand-accent-light transition-colors"
                >
                  View all
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProgrammes.map((related) => (
                  <ProgrammeCard key={related.id} programme={related} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      <Footer />
    </div>
  );
}
