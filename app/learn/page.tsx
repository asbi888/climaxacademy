import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
import { formatDate, getCategoryColor, formatMinutes } from '@/lib/utils';
import CircularProgress from '@/components/ui/CircularProgress';
import ProgressBar from '@/components/ui/ProgressBar';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from 'lucide-react';

interface EnrollmentRow {
  id: number;
  user_id: number;
  programme_id: number;
  enrolled_at: string;
  status: string;
  completion_pct: number;
  completed_at: string | null;
  title: string;
  slug: string;
  category: string;
  duration_hours: number;
  module_count: number;
  thumbnail_gradient: string;
  difficulty_level: string;
}

interface NextModuleRow {
  id: number;
  title: string;
  duration_minutes: number;
  content_type: string;
}

export default async function LearnDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const db = getDb();

  // Fetch user's enrollments with programme data
  const enrollments = db.prepare(`
    SELECT e.*, p.title, p.slug, p.category, p.duration_hours, p.module_count,
           p.thumbnail_gradient, p.difficulty_level
    FROM enrollments e
    JOIN programmes p ON e.programme_id = p.id
    WHERE e.user_id = ?
    ORDER BY e.enrolled_at DESC
  `).all(user.id) as EnrollmentRow[];

  // Count certificates
  const certCount = db.prepare(`
    SELECT COUNT(*) as count FROM certificates WHERE user_id = ?
  `).get(user.id) as { count: number };

  // Stats
  const totalProgrammes = enrollments.length;
  const completedProgrammes = enrollments.filter((e) => e.status === 'completed').length;
  const inProgressProgrammes = enrollments.filter((e) => e.status === 'in_progress').length;
  const certificates = certCount.count;

  // Find the first in_progress enrollment for "Continue Learning"
  const continueEnrollment = enrollments.find((e) => e.status === 'in_progress');

  // Get next module for the continue enrollment
  let nextModule: NextModuleRow | null = null;
  if (continueEnrollment) {
    nextModule = db.prepare(`
      SELECT m.id, m.title, m.duration_minutes, m.content_type
      FROM modules m
      LEFT JOIN module_progress mp ON mp.module_id = m.id AND mp.enrollment_id = ?
      WHERE m.programme_id = ?
        AND (mp.status IS NULL OR mp.status != 'completed')
      ORDER BY m.order_index ASC
      LIMIT 1
    `).get(continueEnrollment.id, continueEnrollment.programme_id) as NextModuleRow | null;
  }

  const stats = [
    { label: 'Total Programmes', value: totalProgrammes, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Completed', value: completedProgrammes, icon: CheckCircle2, color: 'text-brand-emerald', bg: 'bg-brand-emerald/10' },
    { label: 'In Progress', value: inProgressProgrammes, icon: Clock, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
    { label: 'Certificates', value: certificates, icon: Award, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="glass-card p-8 animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-brand-accent" />
              <span className="text-sm text-brand-muted">Welcome back</span>
            </div>
            <h1 className="text-3xl font-bold text-brand-text mb-1">
              Hello, <span className="text-gradient">{user.name.split(' ')[0]}</span>
            </h1>
            <p className="text-brand-muted">
              {user.job_title}{user.company_name ? ` at ${user.company_name}` : ''}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-sky-600/10 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-brand-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`glass-card p-5 animate-slide-up stagger-${idx + 1}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-text">{stat.value}</p>
                  <p className="text-sm text-brand-muted">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Learning Section */}
      {continueEnrollment && nextModule && (
        <div className="animate-slide-up stagger-3">
          <h2 className="text-lg font-semibold text-brand-text mb-4">Continue Learning</h2>
          <div className="glass-card glass-card-hover overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Gradient thumbnail */}
              <div
                className="lg:w-64 h-32 lg:h-auto shrink-0"
                style={{ background: continueEnrollment.thumbnail_gradient }}
              >
                <div className="w-full h-full flex items-center justify-center bg-black/20">
                  <PlayCircle className="w-12 h-12 text-white/80" />
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${getCategoryColor(continueEnrollment.category)}`}>
                      {continueEnrollment.category}
                    </span>
                    <h3 className="text-xl font-bold text-brand-text mt-2">
                      {continueEnrollment.title}
                    </h3>
                  </div>
                  <CircularProgress
                    value={continueEnrollment.completion_pct}
                    size={60}
                    strokeWidth={5}
                  />
                </div>
                <ProgressBar value={continueEnrollment.completion_pct} size="sm" showLabel className="mb-4" />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-brand-muted">
                    <span className="font-medium text-brand-text">Next:</span>{' '}
                    {nextModule.title}
                    <span className="mx-2 text-slate-300">|</span>
                    {formatMinutes(nextModule.duration_minutes)}
                  </div>
                  <Link
                    href={`/learn/programme/${continueEnrollment.slug}/module/${nextModule.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-sky-300 transition-colors"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* My Programmes Grid */}
      <div className="animate-slide-up stagger-4">
        <h2 className="text-lg font-semibold text-brand-text mb-4">My Programmes</h2>
        {enrollments.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-brand-muted" />
            </div>
            <h3 className="text-lg font-semibold text-brand-text mb-2">No programmes yet</h3>
            <p className="text-brand-muted text-sm max-w-sm mx-auto">
              You haven&apos;t been enrolled in any training programmes yet. Contact your HR administrator to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {enrollments.map((enrollment, idx) => (
              <Link
                key={enrollment.id}
                href={`/learn/programme/${enrollment.slug}`}
                className={`glass-card glass-card-hover overflow-hidden group transition-all duration-300 animate-slide-up stagger-${Math.min(idx + 1, 6)}`}
              >
                {/* Gradient header */}
                <div
                  className="h-28 relative"
                  style={{ background: enrollment.thumbnail_gradient }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border bg-black/30 backdrop-blur-sm ${getCategoryColor(enrollment.category)}`}>
                      {enrollment.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    {enrollment.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30 backdrop-blur-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : enrollment.status === 'in_progress' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-accent/20 text-brand-accent border border-brand-accent/30 backdrop-blur-sm">
                        <Clock className="w-3 h-3" />
                        In Progress
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/60 border border-white/10 backdrop-blur-sm">
                        Not Started
                      </span>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-semibold text-brand-text group-hover:text-brand-accent transition-colors mb-3 line-clamp-1">
                    {enrollment.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-xs text-brand-muted">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {enrollment.module_count} modules
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {enrollment.duration_hours}h
                      </span>
                    </div>
                    <CircularProgress
                      value={enrollment.completion_pct}
                      size={48}
                      strokeWidth={4}
                      color={enrollment.status === 'completed' ? 'emerald' : 'sky'}
                      showValue
                    />
                  </div>
                  <ProgressBar
                    value={enrollment.completion_pct}
                    size="sm"
                    color={enrollment.status === 'completed' ? 'emerald' : 'sky'}
                  />
                  <p className="text-xs text-brand-muted mt-3">
                    Enrolled {formatDate(enrollment.enrolled_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
