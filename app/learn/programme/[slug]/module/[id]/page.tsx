import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';
import type { Module, Programme, Enrollment, ModuleProgress, QuizQuestion } from '@/db';
import { formatMinutes, getContentTypeLabel } from '@/lib/utils';
import VideoPlaceholder from '@/components/learner/VideoPlaceholder';
import ModuleNavigation from '@/components/learner/ModuleNavigation';
import QuizView from '@/components/learner/QuizView';
import MarkCompleteButton from '@/components/learner/MarkCompleteButton';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Play,
  HelpCircle,
  Dumbbell,
  FileText,
  CheckCircle2,
} from 'lucide-react';

const contentTypeIcons: Record<string, typeof Play> = {
  video: Play,
  reading: BookOpen,
  exercise: Dumbbell,
  quiz: HelpCircle,
};

export default async function ModuleContentPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { slug, id } = await params;
  const moduleId = Number(id);

  const { data: programme } = await supabase
    .from('programmes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!programme) redirect('/learn');

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('programme_id', programme.id)
    .single();

  if (!enrollment) redirect('/learn');

  const { data: module_ } = await supabase
    .from('modules')
    .select('*')
    .eq('id', moduleId)
    .eq('programme_id', programme.id)
    .single();

  if (!module_) redirect(`/learn/programme/${slug}`);

  const { data: progress } = await supabase
    .from('module_progress')
    .select('*')
    .eq('module_id', moduleId)
    .eq('enrollment_id', enrollment.id)
    .maybeSingle();

  const isCompleted = progress?.status === 'completed';

  const { data: allModulesRaw } = await supabase
    .from('modules')
    .select('id, title, order_index')
    .eq('programme_id', programme.id)
    .order('order_index');

  const allModules = allModulesRaw || [];
  const currentIndex = allModules.findIndex((m) => m.id === moduleId);
  const prevModule = currentIndex > 0
    ? { id: allModules[currentIndex - 1].id, title: allModules[currentIndex - 1].title }
    : null;
  const nextModule = currentIndex < allModules.length - 1
    ? { id: allModules[currentIndex + 1].id, title: allModules[currentIndex + 1].title }
    : null;

  let quizQuestions: QuizQuestion[] = [];
  if (module_.content_type === 'quiz') {
    const { data: qq } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('module_id', moduleId);
    quizQuestions = (qq || []) as QuizQuestion[];
  }

  const ContentTypeIcon = contentTypeIcons[module_.content_type] || FileText;
  const isQuiz = module_.content_type === 'quiz';

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Back link */}
      <Link
        href={`/learn/programme/${slug}`}
        className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {programme.title}
      </Link>

      {/* Module Header */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
                module_.content_type === 'quiz'
                  ? 'bg-purple-400/10 text-purple-400 border border-purple-400/20'
                  : module_.content_type === 'video'
                  ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20'
                  : module_.content_type === 'exercise'
                  ? 'bg-sky-400/10 text-sky-400 border border-sky-400/20'
                  : 'bg-gray-400/10 text-gray-400 border border-gray-400/20'
              }`}>
                <ContentTypeIcon className="w-3.5 h-3.5" />
                {getContentTypeLabel(module_.content_type)}
              </span>
              <span className="flex items-center gap-1 text-xs text-brand-muted">
                <Clock className="w-3.5 h-3.5" />
                {formatMinutes(module_.duration_minutes)}
              </span>
              <span className="text-xs text-brand-muted">
                Module {module_.order_index} of {allModules.length}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-brand-text mb-2">{module_.title}</h1>
            {module_.description && (
              <p className="text-sm text-brand-muted leading-relaxed">{module_.description}</p>
            )}
          </div>
          {isCompleted && (
            <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-emerald/10 border border-brand-emerald/20">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
              <span className="text-xs font-semibold text-brand-emerald">Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Module Content */}
      <div className="animate-slide-up stagger-2">
        {isQuiz && quizQuestions.length > 0 ? (
          /* Quiz content */
          <div>
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-brand-text">Quiz Assessment</h2>
                  <p className="text-xs text-brand-muted">
                    {quizQuestions.length} questions | Pass mark: 70%
                  </p>
                </div>
              </div>
            </div>

            {isCompleted && progress?.quiz_score !== null && progress?.quiz_score !== undefined ? (
              <div className={`glass-card p-6 mb-6 ${progress.quiz_score >= 70 ? 'border-brand-emerald/20' : 'border-red-400/20'}`}>
                <div className="text-center">
                  <p className={`text-3xl font-bold mb-1 ${progress.quiz_score >= 70 ? 'text-brand-emerald' : 'text-red-400'}`}>
                    {progress.quiz_score}%
                  </p>
                  <p className="text-sm text-brand-muted">
                    {progress.quiz_score >= 70 ? 'You passed this quiz!' : 'Quiz completed'}
                  </p>
                </div>
              </div>
            ) : (
              <QuizView
                moduleId={moduleId}
                enrollmentId={enrollment.id}
                questions={quizQuestions}
                programmeSlug={slug}
              />
            )}
          </div>
        ) : (
          /* Non-quiz content */
          <div className="space-y-6">
            {/* Video placeholder (for video and exercise types) */}
            {(module_.content_type === 'video' || module_.content_type === 'exercise') && (
              <VideoPlaceholder gradient={programme.thumbnail_gradient} />
            )}

            {/* Module text content */}
            {module_.content_text && (
              <div className="glass-card p-8">
                <div className="prose prose-sm max-w-none">
                  <div className="text-brand-text/90 leading-relaxed space-y-4">
                    {module_.content_text.split('\n').map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mark as Complete button (only for non-quiz, non-completed modules) */}
            {!isCompleted && (
              <div className="flex justify-center pt-4">
                <MarkCompleteButton
                  enrollmentId={enrollment.id}
                  moduleId={moduleId}
                  programmeSlug={slug}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Module Navigation */}
      <div className="animate-slide-up stagger-3">
        <ModuleNavigation
          prevModule={prevModule}
          nextModule={nextModule}
          programmeSlug={slug}
        />
      </div>
    </div>
  );
}
