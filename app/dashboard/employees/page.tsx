import { redirect } from 'next/navigation';
import { Users, Search, Award } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';
import ProgressBar from '@/components/ui/ProgressBar';

interface Employee {
  id: number;
  name: string;
  email: string;
  job_title: string;
  department: string;
  enrollments_count: number;
  avg_completion: number;
  certificates_count: number;
}

export default async function EmployeesPage() {
  const user = await getCurrentUser();

  if (!user || (user.role !== 'hr_admin' && user.role !== 'climax_admin')) {
    redirect('/login');
  }

  const companyId = user.company_id;

  // Fetch learner users for this company
  const { data: userRows } = await supabase
    .from('users')
    .select('id, name, email, job_title, department')
    .eq('company_id', companyId)
    .eq('role', 'learner')
    .order('name');

  const userIds = (userRows || []).map((u: any) => u.id);

  // Fetch enrollments for these users
  const { data: enrollmentRows } = await supabase
    .from('enrollments')
    .select('id, user_id, completion_pct')
    .in('user_id', userIds.length > 0 ? userIds : [-1]);

  // Fetch certificates for these users
  const { data: certRows } = await supabase
    .from('certificates')
    .select('user_id')
    .in('user_id', userIds.length > 0 ? userIds : [-1]);

  // Build lookup maps
  const enrollmentsByUser = new Map<number, any[]>();
  for (const e of enrollmentRows || []) {
    if (!enrollmentsByUser.has(e.user_id)) enrollmentsByUser.set(e.user_id, []);
    enrollmentsByUser.get(e.user_id)!.push(e);
  }

  const certCountByUser = new Map<number, number>();
  for (const c of certRows || []) {
    certCountByUser.set(c.user_id, (certCountByUser.get(c.user_id) || 0) + 1);
  }

  // Compute employee data
  const employees: Employee[] = (userRows || []).map((u: any) => {
    const userEnrollments = enrollmentsByUser.get(u.id) || [];
    const enrollmentsCount = userEnrollments.length;
    const avgCompletion = enrollmentsCount > 0
      ? Math.round((userEnrollments.reduce((s: number, e: any) => s + (e.completion_pct || 0), 0) / enrollmentsCount) * 10) / 10
      : 0;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      job_title: u.job_title,
      department: u.department,
      enrollments_count: enrollmentsCount,
      avg_completion: avgCompletion,
      certificates_count: certCountByUser.get(u.id) || 0,
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-text flex items-center gap-3">
            <Users className="w-7 h-7 text-brand-accent" />
            Employee Overview
          </h1>
          <p className="text-brand-muted mt-1">
            {employees.length} employee{employees.length !== 1 ? 's' : ''} enrolled in training programmes
          </p>
        </div>
      </div>

      {/* Search Bar (visual only) */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-brand-text placeholder:text-slate-400 focus:outline-none focus:border-brand-accent/50 transition-colors"
          readOnly
        />
      </div>

      {/* Employee Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="text-left text-xs font-medium text-brand-muted uppercase tracking-wider px-6 py-4">
                  Name
                </th>
                <th className="text-left text-xs font-medium text-brand-muted uppercase tracking-wider px-6 py-4">
                  Email
                </th>
                <th className="text-left text-xs font-medium text-brand-muted uppercase tracking-wider px-6 py-4">
                  Department
                </th>
                <th className="text-center text-xs font-medium text-brand-muted uppercase tracking-wider px-6 py-4">
                  Programmes
                </th>
                <th className="text-left text-xs font-medium text-brand-muted uppercase tracking-wider px-6 py-4 w-48">
                  Avg Progress
                </th>
                <th className="text-center text-xs font-medium text-brand-muted uppercase tracking-wider px-6 py-4">
                  Certificates
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr
                  key={emp.id}
                  className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${
                    index % 2 === 1 ? 'bg-slate-50/50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-brand-text">{emp.name}</p>
                      <p className="text-xs text-brand-muted">{emp.job_title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-brand-muted">{emp.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-brand-muted">{emp.department}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent text-sm font-semibold">
                      {emp.enrollments_count}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ProgressBar
                        value={emp.avg_completion}
                        size="sm"
                        color={emp.avg_completion >= 80 ? 'emerald' : emp.avg_completion >= 50 ? 'sky' : 'blue'}
                      />
                      <span className="text-xs font-medium text-brand-muted whitespace-nowrap w-10 text-right">
                        {emp.avg_completion}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {emp.certificates_count > 0 && (
                        <Award className="w-4 h-4 text-brand-accent" />
                      )}
                      <span className="text-sm font-medium text-brand-text">
                        {emp.certificates_count}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brand-muted text-sm">
                    No employees found for your company.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
