import { NextResponse } from 'next/server';
import { supabase } from '@/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();

  if (!user || (user.role !== 'hr_admin' && user.role !== 'climax_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const companyId = user.company_id;

  // Get learners in company
  const { data: learners } = await supabase
    .from('users')
    .select('id, name, email, job_title, department')
    .eq('company_id', companyId!)
    .eq('role', 'learner');

  if (!learners || learners.length === 0) {
    return NextResponse.json([]);
  }

  const learnerIds = learners.map((l: any) => l.id);

  // Get enrollments for these learners
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('user_id, completion_pct')
    .in('user_id', learnerIds);

  // Get certificates for these learners
  const { data: certificates } = await supabase
    .from('certificates')
    .select('user_id')
    .in('user_id', learnerIds);

  // Build per-user stats
  const employees = learners.map((l: any) => {
    const userEnrollments = (enrollments || []).filter((e: any) => e.user_id === l.id);
    const userCerts = (certificates || []).filter((c: any) => c.user_id === l.id);
    const avgCompletion = userEnrollments.length > 0
      ? Math.round((userEnrollments.reduce((s: number, e: any) => s + (e.completion_pct || 0), 0) / userEnrollments.length) * 10) / 10
      : 0;

    return {
      id: l.id,
      name: l.name,
      email: l.email,
      job_title: l.job_title,
      department: l.department,
      enrollments_count: userEnrollments.length,
      avg_completion: avgCompletion,
      certificates_count: userCerts.length,
    };
  });

  employees.sort((a: any, b: any) => b.avg_completion - a.avg_completion);

  return NextResponse.json(employees);
}
