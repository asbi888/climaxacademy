import { redirect } from 'next/navigation';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
import { getPlanTierColor, timeAgo } from '@/lib/utils';
import KPICard from '@/components/dashboard/KPICard';
import TopPerformers from '@/components/dashboard/TopPerformers';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DashboardCharts from '@/components/dashboard/DashboardCharts';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user || (user.role !== 'hr_admin' && user.role !== 'climax_admin')) {
    redirect('/login');
  }

  const db = getDb();
  const companyId = user.company_id;

  // ---- KPI Stats ----
  const totalEnrolled = (db.prepare(`
    SELECT COUNT(DISTINCT e.user_id) AS count
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    WHERE u.company_id = ?
  `).get(companyId) as { count: number }).count;

  const avgCompletion = (db.prepare(`
    SELECT COALESCE(ROUND(AVG(e.completion_pct), 1), 0) AS avg
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    WHERE u.company_id = ?
  `).get(companyId) as { avg: number }).avg;

  const certificatesEarned = (db.prepare(`
    SELECT COUNT(*) AS count
    FROM certificates c
    JOIN users u ON c.user_id = u.id
    WHERE u.company_id = ?
  `).get(companyId) as { count: number }).count;

  const totalTrainingHours = (db.prepare(`
    SELECT COALESCE(ROUND(SUM(mp.time_spent_minutes) / 60.0, 1), 0) AS hours
    FROM module_progress mp
    JOIN users u ON mp.user_id = u.id
    WHERE u.company_id = ?
  `).get(companyId) as { hours: number }).hours;

  // ---- Chart Data ----
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const enrollmentRaw = db.prepare(`
    SELECT
      strftime('%m', e.enrolled_at) AS month_num,
      COUNT(*) AS count
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    WHERE u.company_id = ?
    GROUP BY month_num
    ORDER BY month_num
  `).all(companyId) as { month_num: string; count: number }[];

  const monthMap = new Map<string, number>();
  for (const row of enrollmentRaw) {
    const idx = parseInt(row.month_num, 10) - 1;
    monthMap.set(months[idx], row.count);
  }

  const allMonthNums = enrollmentRaw.map(r => parseInt(r.month_num, 10));
  const latestMonth = allMonthNums.length > 0 ? Math.max(...allMonthNums) : new Date().getMonth() + 1;
  const startMonth = Math.max(1, latestMonth - 5);

  const enrollmentTrends: { month: string; count: number }[] = [];
  for (let m = startMonth; m <= latestMonth; m++) {
    enrollmentTrends.push({
      month: months[m - 1],
      count: monthMap.get(months[m - 1]) || 0,
    });
  }

  const completionByProgramme = db.prepare(`
    SELECT
      p.title AS name,
      COALESCE(ROUND(AVG(e.completion_pct), 1), 0) AS completion
    FROM programmes p
    JOIN enrollments e ON p.id = e.programme_id
    JOIN users u ON e.user_id = u.id
    WHERE u.company_id = ?
    GROUP BY p.id
    ORDER BY completion DESC
  `).all(companyId) as { name: string; completion: number }[];

  // ---- Top Performers (top 5 by avg completion) ----
  const topPerformers = db.prepare(`
    SELECT
      u.name,
      u.department,
      COALESCE(ROUND(AVG(e.completion_pct), 1), 0) AS avg_completion,
      (SELECT COUNT(*) FROM certificates c WHERE c.user_id = u.id) AS certificates
    FROM users u
    JOIN enrollments e ON u.id = e.user_id
    WHERE u.company_id = ? AND u.role = 'learner'
    GROUP BY u.id
    ORDER BY avg_completion DESC
    LIMIT 5
  `).all(companyId) as { name: string; department: string; avg_completion: number; certificates: number }[];

  // ---- Recent Activity ----
  const recentEnrollments = db.prepare(`
    SELECT
      u.name AS user_name,
      'enrolled in' AS action,
      p.title AS programme_title,
      e.enrolled_at AS time
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    JOIN programmes p ON e.programme_id = p.id
    WHERE u.company_id = ?
    ORDER BY e.enrolled_at DESC
    LIMIT 4
  `).all(companyId) as { user_name: string; action: string; programme_title: string; time: string }[];

  const recentCertificates = db.prepare(`
    SELECT
      u.name AS user_name,
      'earned certificate in' AS action,
      p.title AS programme_title,
      c.issued_at AS time
    FROM certificates c
    JOIN users u ON c.user_id = u.id
    JOIN programmes p ON c.programme_id = p.id
    WHERE u.company_id = ?
    ORDER BY c.issued_at DESC
    LIMIT 3
  `).all(companyId) as { user_name: string; action: string; programme_title: string; time: string }[];

  const recentActivity = [...recentEnrollments, ...recentCertificates]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 6)
    .map(a => ({ ...a, time: timeAgo(a.time) }));

  // ---- Company Info ----
  const company = db.prepare(`
    SELECT name, plan_tier FROM companies WHERE id = ?
  `).get(companyId) as { name: string; plan_tier: string } | undefined;

  const companyName = company?.name || user.company_name || 'Your Company';
  const planTier = company?.plan_tier || 'standard';
  const tierColor = getPlanTierColor(planTier);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Company Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-brand-muted">{companyName} Dashboard</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${tierColor}`}>
              {planTier}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        <div className="stagger-1">
          <KPICard
            title="Total Enrolled"
            value={totalEnrolled}
            icon={Users}
            trend="+12%"
            color="sky"
          />
        </div>
        <div className="stagger-2">
          <KPICard
            title="Avg Completion"
            value={`${avgCompletion}%`}
            icon={TrendingUp}
            trend="+5%"
            color="emerald"
          />
        </div>
        <div className="stagger-3">
          <KPICard
            title="Certificates Earned"
            value={certificatesEarned}
            icon={Award}
            trend="+3"
            color="blue"
          />
        </div>
        <div className="stagger-4">
          <KPICard
            title="Training Hours"
            value={totalTrainingHours}
            icon={Clock}
            trend="+8h"
            color="purple"
          />
        </div>
      </div>

      {/* Charts Row */}
      <DashboardCharts
        enrollmentTrends={enrollmentTrends}
        completionByProgramme={completionByProgramme}
      />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up stagger-4">
        <TopPerformers data={topPerformers} />
        <RecentActivity activities={recentActivity} />
      </div>
    </div>
  );
}
