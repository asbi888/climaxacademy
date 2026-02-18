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

  const employees = db.prepare(`
    SELECT
      u.id,
      u.name,
      u.email,
      u.job_title,
      u.department,
      COUNT(e.id) AS enrollments_count,
      COALESCE(ROUND(AVG(e.completion_pct), 1), 0) AS avg_completion,
      (SELECT COUNT(*) FROM certificates c WHERE c.user_id = u.id) AS certificates_count
    FROM users u
    LEFT JOIN enrollments e ON u.id = e.user_id
    WHERE u.company_id = ? AND u.role = 'learner'
    GROUP BY u.id
    ORDER BY avg_completion DESC
  `).all(companyId);

  return NextResponse.json(employees);
}
