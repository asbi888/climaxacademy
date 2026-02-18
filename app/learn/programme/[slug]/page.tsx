import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
import type { Module, ModuleProgress, Programme, Enrollment } from '@/db';
import { formatMinutes, getContentTypeLabel, getCategoryColor, getDifficultyColor } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';
import {
  CheckCircle2,
  PlayCircle,
  Lock,
  ArrowLeft,
  Clock,
  BookOpen,
  Trophy,
  ChevronRight,
} from 'lucide-react';

interface ModuleWithProgress extends Module {
  progress_status: ModuleProgress['status'] | null;
  started_at: string | null;
  completed_at: string | null;
  quiz_score: number | null;
  time_spent_minutes: number;
}

export default async function ProgrammeLearningPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { slug } = await params;
  const db = getDb();

  // Fetch programme
  const programme = db.prepare(`
    SELECT * FROM programmes WHERE slug = ?
  `).get(slug) as Programme | undefined;

  if (!programme) redirect('/learn');

  // Fetch enrollment
  const enrollment = db.prepare(`
    SELECT * FROM enrollments WHERE user_id = ? AND programme_id = ?
  `).get(user.id, programme.id) as Enrollment | undefined;

  if (!enrollment) redirect('/learn');

  // Fetch modules with progress
  const modules = db.prepare(`
    SELECT m.*,
           mp.status as progress_status,
           mp.started_at,
           mp.completed_at,
           mp.quiz_score,
           COALESCE(mp.time_spent_minutes, 0) as time_spent_minutes
    FROM modules m
    LEFT JOIN module_progress mp ON mp.module_id = m.id AND mp.enrollment_id = ?
    WHERE m.programme_id = ?
    ORDER BY m.order_index ASC
  `).all(enrollment.id, programme.id) as ModuleWithProgress[];

  // Determine the current (first incomplete) module
  const currentModuleIndex = modules.findIndex(
    (m) => m.progress_status !== 'completed'
  );

  const completedCount = modules.filter((m) => m.progress_status === 'completed').length;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Back link */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Programme Header */}
      <div
        className="glass-card overflow-hidden animate-slide-up"
      >
        <div
          className="p-8 relative"
          style={{ background: programme.thumbnail_gradient }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border bg-black/30 backdrop-blur-sm ${getCategoryColor(programme.category)}`}>
                {programme.category}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border bg-black/30 backdrop-blur-sm ${getDifficultyColor(programme.difficulty_level)}`}>
                {programme.difficulty_level.charAt(0).toUpperCase() + programme.difficulty_level.slice(1)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{programme.title}</h1>
            <p className="text-white/70 text-sm max-w-2xl mb-4">{programme.short_description}</p>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {programme.module_count} modules
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {programme.duration_hours} hours
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4" />
                {completedCount}/{modules.length} completed
              </span>
            </div>
          </div>
        </div>
        <div className="px-8 py-5 bg-brand-card/80">
          <ProgressBar
            value={enrollment.completion_pct}
            size="md"
            showLabel
            color={enrollment.status === 'completed' ? 'emerald' : 'sky'}
          />
        </div>
      </div>

      {/* Module Timeline */}
      <div className="animate-slide-up stagger-2">
        <h2 className="text-lg font-semibold text-brand-text mb-5">Course Modules</h2>
        <div className="space-y-3">
          {modules.map((mod, idx) => {
            const isCompleted = mod.progress_status === 'completed';
            const isCurrent = idx === currentModuleIndex;
            const isLocked = !isCompleted && !isCurrent && (
              mod.progress_status === 'locked' || mod.progress_status === null
            );
            const isAvailable = mod.progress_status === 'available' || mod.progress_status === 'in_progress';

            // Module is accessible if completed, current, or available
            const isAccessible = isCompleted || isCurrent || isAvailable;

            return (
              <div
                key={mod.id}
                className={`glass-card transition-all duration-300 ${
                  isCurrent
                    ? 'border-brand-accent/30 shadow-lg shadow-brand-accent/5'
                    : isLocked
                    ? 'opacity-60'
                    : ''
                } ${isAccessible ? 'glass-card-hover' : ''}`}
              >
                <div className="flex items-center gap-4 p-5">
                  {/* Status Icon + Connector */}
                  <div className="flex flex-col items-center shrink-0">
                    {isCompleted ? (
                      <div className="w-10 h-10 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-brand-emerald" />
                      </div>
                    ) : isCurrent || isAvailable ? (
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center animate-glow-pulse">
                        <PlayCircle className="w-5 h-5 text-brand-accent" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-brand-muted/50" />
                      </div>
                    )}
                  </div>

                  {/* Module Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-brand-muted">Module {mod.order_index}</span>
                      <span className="text-xs text-slate-300">|</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        mod.content_type === 'quiz'
                          ? 'bg-purple-400/10 text-purple-400'
                          : mod.content_type === 'video'
                          ? 'bg-blue-400/10 text-blue-400'
                          : mod.content_type === 'exercise'
                          ? 'bg-sky-400/10 text-sky-400'
                          : 'bg-gray-400/10 text-gray-400'
                      }`}>
                        {getContentTypeLabel(mod.content_type)}
                      </span>
                    </div>
                    <h3 className={`font-semibold text-sm ${isLocked ? 'text-brand-muted/70' : 'text-brand-text'}`}>
                      {mod.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-brand-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatMinutes(mod.duration_minutes)}
                      </span>
                      {isCompleted && mod.quiz_score !== null && (
                        <span className={`font-medium ${mod.quiz_score >= 70 ? 'text-brand-emerald' : 'text-red-400'}`}>
                          Quiz: {mod.quiz_score}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    {isAccessible ? (
                      <Link
                        href={`/learn/programme/${slug}/module/${mod.id}`}
                        className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
                          isCurrent
                            ? 'bg-gradient-to-r from-brand-accent to-sky-600 text-white hover:shadow-lg hover:shadow-brand-accent/20'
                            : isCompleted
                            ? 'bg-slate-100 text-brand-muted hover:text-brand-text hover:bg-slate-200'
                            : 'bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20'
                        }`}
                      >
                        {isCurrent ? 'Continue' : isCompleted ? 'Review' : 'Start'}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="text-xs text-brand-muted/50 font-medium">Locked</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
