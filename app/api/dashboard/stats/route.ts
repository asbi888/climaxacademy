import { NextResponse } from 'next/server';
import { supabase } from '@/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();

  if (!user || (user.role !== 'hr_admin' && user.role !== 'climax_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const companyId = user.company_id;

  // Get company users
  const { data: companyUsers } = await supabase
    .from('users')
    .select('id')
    .eq('company_id', companyId!);

  const userIds = (companyUsers || []).map((u: any) => u.id);

  if (userIds.length === 0) {
    return NextResponse.json({
      totalEnrolled: 0,
      avgCompletion: 0,
      certificatesEarned: 0,
      totalTrainingHours: 0,
    });
  }

  // Enrollments for company users
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('user_id, completion_pct')
    .in('user_id', userIds);

  const uniqueEnrolled = new Set((enrollments || []).map((e: any) => e.user_id)).size;
  const avgCompletion = enrollments && enrollments.length > 0
    ? Math.round(((enrollments.reduce((s: number, e: any) => s + (e.completion_pct || 0), 0)) / enrollments.length) * 10) / 10
    : 0;

  // Certificates
  const { count: certificatesEarned } = await supabase
    .from('certificates')
    .select('*', { count: 'exact', head: true })
    .in('user_id', userIds);

  // Training hours
  const { data: progressData } = await supabase
    .from('module_progress')
    .select('time_spent_minutes')
    .in('user_id', userIds);

  const totalMinutes = (progressData || []).reduce((s: number, p: any) => s + (p.time_spent_minutes || 0), 0);
  const totalTrainingHours = Math.round((totalMinutes / 60) * 10) / 10;

  return NextResponse.json({
    totalEnrolled: uniqueEnrolled,
    avgCompletion,
    certificatesEarned: certificatesEarned || 0,
    totalTrainingHours,
  });
}
