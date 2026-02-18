import { NextResponse } from 'next/server';
import { supabase } from '@/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();

  if (!user || (user.role !== 'hr_admin' && user.role !== 'climax_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const companyId = user.company_id;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Get company users
  const { data: companyUsers } = await supabase
    .from('users')
    .select('id')
    .eq('company_id', companyId!);

  const userIds = (companyUsers || []).map((u: any) => u.id);

  if (userIds.length === 0) {
    return NextResponse.json({ enrollmentTrends: [], completionByProgramme: [] });
  }

  // Get enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('enrolled_at, programme_id, completion_pct')
    .in('user_id', userIds);

  // Enrollment trends by month
  const monthCounts = new Map<number, number>();
  for (const e of enrollments || []) {
    const month = new Date(e.enrolled_at).getMonth();
    monthCounts.set(month, (monthCounts.get(month) || 0) + 1);
  }

  const allMonthNums = Array.from(monthCounts.keys());
  const latestMonth = allMonthNums.length > 0 ? Math.max(...allMonthNums) : new Date().getMonth();
  const startMonth = Math.max(0, latestMonth - 5);

  const enrollmentTrends: { month: string; count: number }[] = [];
  for (let m = startMonth; m <= latestMonth; m++) {
    enrollmentTrends.push({
      month: months[m],
      count: monthCounts.get(m) || 0,
    });
  }

  // Completion by programme
  const { data: programmes } = await supabase
    .from('programmes')
    .select('id, title');

  const programmeMap = new Map<number, { name: string; completions: number[] }>();
  for (const p of programmes || []) {
    programmeMap.set(p.id, { name: p.title, completions: [] });
  }

  for (const e of enrollments || []) {
    const prog = programmeMap.get(e.programme_id);
    if (prog) {
      prog.completions.push(e.completion_pct || 0);
    }
  }

  const completionByProgramme = Array.from(programmeMap.values())
    .filter(p => p.completions.length > 0)
    .map(p => ({
      name: p.name,
      completion: Math.round((p.completions.reduce((a, b) => a + b, 0) / p.completions.length) * 10) / 10,
    }))
    .sort((a, b) => b.completion - a.completion);

  return NextResponse.json({
    enrollmentTrends,
    completionByProgramme,
  });
}
