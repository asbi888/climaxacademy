import { redirect } from 'next/navigation';
import { GraduationCap, Users, TrendingUp, Award, Brain } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';
import ProgressBar from '@/components/ui/ProgressBar';

interface ProgrammeAnalytics {
  id: number;
  title: string;
  category: string;
  duration_hours: number;
  thumbnail_gradient: string;
  enrolled_count: number;
  avg_completion: number;
  avg_quiz_score: number;
  certificates_count: number;
}

export default async function ProgrammesPage() {
  const user = await getCurrentUser();

  if (!user || (user.role !== 'hr_admin' && user.role !== 'climax_admin')) {
    redirect('/login');
  }

  const companyId = user.company_id;

  // Fetch company user IDs
  const { data: companyUsers } = await supabase
    .from('users')
    .select('id')
    .eq('company_id', companyId);
  const companyUserIds = (companyUsers || []).map((u: any) => u.id);

  // Fetch all programmes
  const { data: allProgrammes } = await supabase
    .from('programmes')
    .select('id, title, category, duration_hours, thumbnail_gradient');

  // Fetch enrollments for company users
  const { data: enrollmentRows } = await supabase
    .from('enrollments')
    .select('id, programme_id, completion_pct')
    .in('user_id', companyUserIds.length > 0 ? companyUserIds : [-1]);

  // Fetch module_progress quiz scores for those enrollments
  const enrollmentIds = (enrollmentRows || []).map((e: any) => e.id);
  const { data: progressRows } = await supabase
    .from('module_progress')
    .select('enrollment_id, quiz_score')
    .in('enrollment_id', enrollmentIds.length > 0 ? enrollmentIds : [-1]);

  // Fetch certificates for company users
  const { data: certRows } = await supabase
    .from('certificates')
    .select('programme_id')
    .in('user_id', companyUserIds.length > 0 ? companyUserIds : [-1]);

  // Build lookup maps
  const enrollmentsByProg = new Map<number, any[]>();
  for (const e of enrollmentRows || []) {
    if (!enrollmentsByProg.has(e.programme_id)) enrollmentsByProg.set(e.programme_id, []);
    enrollmentsByProg.get(e.programme_id)!.push(e);
  }

  const quizScoresByEnrollment = new Map<number, number[]>();
  for (const mp of progressRows || []) {
    if (mp.quiz_score != null) {
      if (!quizScoresByEnrollment.has(mp.enrollment_id)) quizScoresByEnrollment.set(mp.enrollment_id, []);
      quizScoresByEnrollment.get(mp.enrollment_id)!.push(mp.quiz_score);
    }
  }

  const certCountByProg = new Map<number, number>();
  for (const c of certRows || []) {
    certCountByProg.set(c.programme_id, (certCountByProg.get(c.programme_id) || 0) + 1);
  }

  // Compute programme analytics
  const programmes: ProgrammeAnalytics[] = (allProgrammes || [])
    .map((prog: any) => {
      const enrollments = enrollmentsByProg.get(prog.id) || [];
      const enrolledCount = enrollments.length;
      const avgCompletion = enrolledCount > 0
        ? Math.round((enrollments.reduce((s: number, e: any) => s + (e.completion_pct || 0), 0) / enrolledCount) * 10) / 10
        : 0;

      // Collect all quiz scores across enrollments for this programme
      const allQuizScores: number[] = [];
      for (const e of enrollments) {
        const scores = quizScoresByEnrollment.get(e.id) || [];
        allQuizScores.push(...scores);
      }
      const avgQuizScore = allQuizScores.length > 0
        ? Math.round((allQuizScores.reduce((s: number, v: number) => s + v, 0) / allQuizScores.length) * 10) / 10
        : 0;

      return {
        id: prog.id,
        title: prog.title,
        category: prog.category,
        duration_hours: prog.duration_hours,
        thumbnail_gradient: prog.thumbnail_gradient,
        enrolled_count: enrolledCount,
        avg_completion: avgCompletion,
        avg_quiz_score: avgQuizScore,
        certificates_count: certCountByProg.get(prog.id) || 0,
      };
    })
    .sort((a: any, b: any) => b.enrolled_count - a.enrolled_count);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-brand-text flex items-center gap-3">
          <GraduationCap className="w-7 h-7 text-brand-accent" />
          Programme Analytics
        </h1>
        <p className="text-brand-muted mt-1">
          Performance overview for {programmes.length} training programmes
        </p>
      </div>

      {/* Programme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {programmes.map((prog, index) => (
          <div
            key={prog.id}
            className="glass-card glass-card-hover overflow-hidden transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
          >
            {/* Gradient Bar */}
            <div
              className="h-1.5 w-full"
              style={{ background: prog.thumbnail_gradient }}
            />

            <div className="p-6">
              {/* Title & Category */}
              <div className="mb-4">
                <span className="text-xs font-medium text-brand-muted uppercase tracking-wider">
                  {prog.category}
                </span>
                <h3 className="text-lg font-semibold text-brand-text mt-1 leading-snug">
                  {prog.title}
                </h3>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-brand-text">{prog.enrolled_count}</p>
                    <p className="text-xs text-brand-muted">Enrolled</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-emerald/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-brand-emerald" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-brand-text">{prog.avg_completion}%</p>
                    <p className="text-xs text-brand-muted">Avg Completion</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-brand-text">
                      {prog.avg_quiz_score > 0 ? `${prog.avg_quiz_score}%` : 'N/A'}
                    </p>
                    <p className="text-xs text-brand-muted">Avg Quiz</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Award className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-brand-text">{prog.certificates_count}</p>
                    <p className="text-xs text-brand-muted">Certificates</p>
                  </div>
                </div>
              </div>

              {/* Completion Bar */}
              <ProgressBar
                value={prog.avg_completion}
                size="sm"
                color={prog.avg_completion >= 80 ? 'emerald' : 'sky'}
                showLabel
              />
            </div>
          </div>
        ))}

        {programmes.length === 0 && (
          <div className="col-span-full text-center py-16">
            <GraduationCap className="w-12 h-12 text-brand-muted mx-auto mb-3" />
            <p className="text-brand-muted">No programme data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
