import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
import type { Enrollment, Module, ModuleProgress, Programme } from '@/db';

interface EnrollmentWithProgramme extends Enrollment {
  title: string;
  slug: string;
  category: string;
  duration_hours: number;
  module_count: number;
  thumbnail_gradient: string;
  difficulty_level: string;
}

interface ModuleWithProgress extends Module {
  progress_status: ModuleProgress['status'] | null;
  started_at: string | null;
  completed_at: string | null;
  quiz_score: number | null;
  time_spent_minutes: number;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const enrollmentId = Number(id);

  const db = getDb();

  // Fetch enrollment with programme info
  const enrollment = db.prepare(`
    SELECT e.*, p.title, p.slug, p.category, p.duration_hours, p.module_count,
           p.thumbnail_gradient, p.difficulty_level
    FROM enrollments e
    JOIN programmes p ON e.programme_id = p.id
    WHERE e.id = ? AND e.user_id = ?
  `).get(enrollmentId, user.id) as EnrollmentWithProgramme | undefined;

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  // Fetch all modules for this programme with progress
  const modules = db.prepare(`
    SELECT m.*,
           mp.status as progress_status,
           mp.started_at,
           mp.completed_at,
           mp.quiz_score,
           COALESCE(mp.time_spent_minutes, 0) as time_spent_minutes
    FROM modules m
    LEFT JOIN module_progress mp ON mp.module_id = m.id AND mp.enrollment_id = ?
    WHERE m.programme_id = ?
    ORDER BY m.order_index ASC
  `).all(enrollmentId, enrollment.programme_id) as ModuleWithProgress[];

  return NextResponse.json({
    enrollment,
    modules,
  });
}
