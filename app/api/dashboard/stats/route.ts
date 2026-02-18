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

  // Total enrolled (distinct users with at least one enrollment)
  const totalEnrolled = db.prepare(`
    SELECT COUNT(DISTINCT e.user_id) AS count
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    WHERE u.company_id = ?
  `).get(companyId) as { count: number };

  // Average completion percentage across all enrollments
  const avgCompletion = db.prepare(`
    SELECT COALESCE(ROUND(AVG(e.completion_pct), 1), 0) AS avg
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    WHERE u.company_id = ?
  `).get(companyId) as { avg: number };

  // Certificates earned
  const certificatesEarned = db.prepare(`
    SELECT COUNT(*) AS count
    FROM certificates c
    JOIN users u ON c.user_id = u.id
    WHERE u.company_id = ?
  `).get(companyId) as { count: number };

  // Total training hours (sum of time_spent_minutes from module_progress, converted to hours)
  const totalTrainingHours = db.prepare(`
    SELECT COALESCE(ROUND(SUM(mp.time_spent_minutes) / 60.0, 1), 0) AS hours
    FROM module_progress mp
    JOIN users u ON mp.user_id = u.id
    WHERE u.company_id = ?
  `).get(companyId) as { hours: number };

  return NextResponse.json({
    totalEnrolled: totalEnrolled.count,
    avgCompletion: avgCompletion.avg,
    certificatesEarned: certificatesEarned.count,
    totalTrainingHours: totalTrainingHours.hours,
  });
}
