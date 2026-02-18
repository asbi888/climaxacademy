import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const enrollments = db.prepare(`
    SELECT e.*, p.title, p.slug, p.category, p.duration_hours, p.module_count,
           p.thumbnail_gradient, p.difficulty_level
    FROM enrollments e
    JOIN programmes p ON e.programme_id = p.id
    WHERE e.user_id = ?
    ORDER BY e.enrolled_at DESC
  `).all(user.id);

  return NextResponse.json(enrollments);
}
