import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();

  if (!user || (user.role !== 'hr_admin' && user.role !== 'climax_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const companyId = user.company_id;

  // Enrollment trends over 6 months
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

  // Build 6-month range ending with the latest month that has data
  const monthMap = new Map<string, number>();
  for (const row of enrollmentRaw) {
    const idx = parseInt(row.month_num, 10) - 1;
    monthMap.set(months[idx], row.count);
  }

  // Determine the 6-month window
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

  // Completion by programme
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

  return NextResponse.json({
    enrollmentTrends,
    completionByProgramme,
  });
}
