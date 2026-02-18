import { redirect } from 'next/navigation';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';
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

  const companyId = user.company_id;

  // ---- Fetch company users ----
  const { data: companyUsers } = await supabase
    .from('users')
    .select('id')
    .eq('company_id', companyId);
  const companyUserIds = (companyUsers || []).map((u: any) => u.id);

  // ---- Fetch all enrollments for company users ----
  const { data: allEnrollments } = await supabase
    .from('enrollments')
    .select('*, programmes(id, title, slug)')
    .in('user_id', companyUserIds.length > 0 ? companyUserIds : [-1]);

  const enrollmentsArr = allEnrollments || [];

  // ---- KPI Stats ----
  const totalEnrolled = new Set(enrollmentsArr.map((e: any) => e.user_id)).size;

  const avgCompletion = enrollmentsArr.length > 0
    ? Math.round((enrollmentsArr.reduce((sum: number, e: any) => sum + (e.completion_pct || 0), 0) / enrollmentsArr.length) * 10) / 10
    : 0;

  const { count: certificatesEarnedCount } = await supabase
    .from('certificates')
    .select('*', { count: 'exact', head: true })
    .in('user_id', companyUserIds.length > 0 ? companyUserIds : [-1]);
  const certificatesEarned = certificatesEarnedCount || 0;

  const { data: mpRows } = await supabase
    .from('module_progress')
    .select('time_spent_minutes')
    .in('user_id', companyUserIds.length > 0 ? companyUserIds : [-1]);

  const totalTrainingHours = Math.round(((mpRows || []).reduce((sum: number, mp: any) => sum + (mp.time_spent_minutes || 0), 0) / 60.0) * 10) / 10;

  // ---- Chart Data ----
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthCountMap = new Map<number, number>();
  for (const e of enrollmentsArr) {
    const d = new Date(e.enrolled_at);
    const monthNum = d.getMonth() + 1;
    monthCountMap.set(monthNum, (monthCountMap.get(monthNum) || 0) + 1);
  }

  const allMonthNums = Array.from(monthCountMap.keys());
  const latestMonth = allMonthNums.length > 0 ? Math.max(...allMonthNums) : new Date().getMonth() + 1;
  const startMonth = Math.max(1, latestMonth - 5);

  const enrollmentTrends: { month: string; count: number }[] = [];
  for (let m = startMonth; m <= latestMonth; m++) {
    enrollmentTrends.push({
      month: months[m - 1],
      count: monthCountMap.get(m) || 0,
    });
  }

  // Completion by programme
  const progMap = new Map<number, { name: string; total: number; count: number }>();
  for (const e of enrollmentsArr) {
    const pid = e.programme_id;
    const pName = (e.programmes as any)?.title || 'Unknown';
    if (!progMap.has(pid)) {
      progMap.set(pid, { name: pName, total: 0, count: 0 });
    }
    const entry = progMap.get(pid)!;
    entry.total += e.completion_pct || 0;
    entry.count += 1;
  }
  const completionByProgramme = Array.from(progMap.values())
    .map(p => ({ name: p.name, completion: Math.round((p.total / p.count) * 10) / 10 }))
    .sort((a, b) => b.completion - a.completion);

  // ---- Top Performers ----
  const { data: learnerUsers } = await supabase
    .from('users')
    .select('id, name, department')
    .eq('company_id', companyId)
    .eq('role', 'learner');

  const { data: allCerts } = await supabase
    .from('certificates')
    .select('user_id')
    .in('user_id', companyUserIds.length > 0 ? companyUserIds : [-1]);

  const certCountByUser = new Map<number, number>();
  for (const cc of allCerts || []) {
    certCountByUser.set(cc.user_id, (certCountByUser.get(cc.user_id) || 0) + 1);
  }

  const enrollmentsByUser = new Map<number, number[]>();
  for (const e of enrollmentsArr) {
    if (!enrollmentsByUser.has(e.user_id)) {
      enrollmentsByUser.set(e.user_id, []);
    }
    enrollmentsByUser.get(e.user_id)!.push(e.completion_pct || 0);
  }

  const topPerformers = (learnerUsers || [])
    .filter((u: any) => enrollmentsByUser.has(u.id))
    .map((u: any) => {
      const completions = enrollmentsByUser.get(u.id)!;
      const avg = Math.round((completions.reduce((s: number, v: number) => s + v, 0) / completions.length) * 10) / 10;
      return {
        name: u.name,
        department: u.department,
        avg_completion: avg,
        certificates: certCountByUser.get(u.id) || 0,
      };
    })
    .sort((a: any, b: any) => b.avg_completion - a.avg_completion)
    .slice(0, 5);

  // ---- Recent Activity ----
  const { data: recentEnrollRaw } = await supabase
    .from('enrollments')
    .select('enrolled_at, user_id, users(name), programmes(title)')
    .in('user_id', companyUserIds.length > 0 ? companyUserIds : [-1])
    .order('enrolled_at', { ascending: false })
    .limit(4);

  const recentEnrollments = (recentEnrollRaw || []).map((e: any) => ({
    user_name: e.users?.name || '',
    action: 'enrolled in',
    programme_title: e.programmes?.title || '',
    time: e.enrolled_at,
  }));

  const { data: recentCertRaw } = await supabase
    .from('certificates')
    .select('issued_at, user_id, users(name), programmes(title)')
    .in('user_id', companyUserIds.length > 0 ? companyUserIds : [-1])
    .order('issued_at', { ascending: false })
    .limit(3);

  const recentCertificates = (recentCertRaw || []).map((cc: any) => ({
    user_name: cc.users?.name || '',
    action: 'earned certificate in',
    programme_title: cc.programmes?.title || '',
    time: cc.issued_at,
  }));

  const recentActivity = [...recentEnrollments, ...recentCertificates]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 6)
    .map(a => ({ ...a, time: timeAgo(a.time) }));

  // ---- Company Info ----
  const { data: company } = await supabase
    .from('companies')
    .select('name, plan_tier')
    .eq('id', companyId)
    .maybeSingle();

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
