import { redirect } from 'next/navigation';
import { GraduationCap, Users, TrendingUp, Award, Brain } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
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

  const db = getDb();
  const companyId = user.company_id;

  const programmes = db.prepare(`
    SELECT
      p.id,
      p.title,
      p.category,
      p.duration_hours,
      p.thumbnail_gradient,
      COUNT(DISTINCT e.id) AS enrolled_count,
      COALESCE(ROUND(AVG(e.completion_pct), 1), 0) AS avg_completion,
      COALESCE(ROUND(AVG(
        CASE WHEN mp.quiz_score IS NOT NULL THEN mp.quiz_score END
      ), 1), 0) AS avg_quiz_score,
      (
        SELECT COUNT(*) FROM certificates c
        JOIN users cu ON c.user_id = cu.id
        WHERE c.programme_id = p.id AND cu.company_id = ?
      ) AS certificates_count
    FROM programmes p
    LEFT JOIN enrollments e ON p.id = e.programme_id
      AND e.user_id IN (SELECT id FROM users WHERE company_id = ?)
    LEFT JOIN module_progress mp ON e.id = mp.enrollment_id
    GROUP BY p.id
    ORDER BY enrolled_count DESC
  `).all(companyId, companyId) as ProgrammeAnalytics[];

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
