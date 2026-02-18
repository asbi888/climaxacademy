import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
import type { ModuleProgress, Module } from '@/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; moduleId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, moduleId } = await params;
  const enrollmentId = Number(id);
  const modId = Number(moduleId);

  const db = getDb();

  // Verify enrollment belongs to user
  const enrollment = db.prepare(`
    SELECT * FROM enrollments WHERE id = ? AND user_id = ?
  `).get(enrollmentId, user.id) as { id: number; programme_id: number; status: string } | undefined;

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  // Verify module belongs to programme
  const module_ = db.prepare(`
    SELECT * FROM modules WHERE id = ? AND programme_id = ?
  `).get(modId, enrollment.programme_id) as Module | undefined;

  if (!module_) {
    return NextResponse.json({ error: 'Module not found' }, { status: 404 });
  }

  // Check if module progress exists
  const progress = db.prepare(`
    SELECT * FROM module_progress WHERE module_id = ? AND enrollment_id = ?
  `).get(modId, enrollmentId) as ModuleProgress | undefined;

  const now = new Date().toISOString();

  // Optionally receive quiz_score from the request body
  let quizScore: number | null = null;
  try {
    const body = await request.json();
    if (body.quiz_score !== undefined) {
      quizScore = body.quiz_score;
    }
  } catch {
    // No body or invalid JSON -- that's fine for non-quiz modules
  }

  if (progress) {
    // Update existing progress to completed
    db.prepare(`
      UPDATE module_progress
      SET status = 'completed', completed_at = ?, quiz_score = COALESCE(?, quiz_score)
      WHERE module_id = ? AND enrollment_id = ?
    `).run(now, quizScore, modId, enrollmentId);
  } else {
    // Create new completed progress record
    db.prepare(`
      INSERT INTO module_progress (user_id, module_id, enrollment_id, status, started_at, completed_at, quiz_score, time_spent_minutes)
      VALUES (?, ?, ?, 'completed', ?, ?, ?, 0)
    `).run(user.id, modId, enrollmentId, now, now, quizScore);
  }

  // Unlock next module
  const nextModule = db.prepare(`
    SELECT * FROM modules
    WHERE programme_id = ? AND order_index > ?
    ORDER BY order_index ASC LIMIT 1
  `).get(enrollment.programme_id, module_.order_index) as Module | undefined;

  if (nextModule) {
    const nextProgress = db.prepare(`
      SELECT * FROM module_progress WHERE module_id = ? AND enrollment_id = ?
    `).get(nextModule.id, enrollmentId) as ModuleProgress | undefined;

    if (nextProgress) {
      // Only update if currently locked
      if (nextProgress.status === 'locked') {
        db.prepare(`
          UPDATE module_progress SET status = 'available', started_at = ?
          WHERE module_id = ? AND enrollment_id = ?
        `).run(now, nextModule.id, enrollmentId);
      }
    } else {
      // Create progress record as available
      db.prepare(`
        INSERT INTO module_progress (user_id, module_id, enrollment_id, status, started_at, time_spent_minutes)
        VALUES (?, ?, ?, 'available', ?, 0)
      `).run(user.id, nextModule.id, enrollmentId, now);
    }
  }

  // Recalculate completion percentage
  const totalModules = db.prepare(`
    SELECT COUNT(*) as count FROM modules WHERE programme_id = ?
  `).get(enrollment.programme_id) as { count: number };

  const completedModules = db.prepare(`
    SELECT COUNT(*) as count FROM module_progress
    WHERE enrollment_id = ? AND status = 'completed'
  `).get(enrollmentId) as { count: number };

  const completionPct = totalModules.count > 0
    ? Math.round((completedModules.count / totalModules.count) * 1000) / 10
    : 0;

  // Check if all modules are complete
  const allComplete = completedModules.count >= totalModules.count;

  if (allComplete) {
    // Mark enrollment as completed
    db.prepare(`
      UPDATE enrollments SET status = 'completed', completion_pct = 100.0, completed_at = ?
      WHERE id = ?
    `).run(now, enrollmentId);

    // Check if a certificate already exists
    const existingCert = db.prepare(`
      SELECT id FROM certificates WHERE enrollment_id = ?
    `).get(enrollmentId);

    if (!existingCert) {
      // Generate certificate number
      const certCount = db.prepare(`SELECT COUNT(*) as count FROM certificates`).get() as { count: number };
      const certNumber = `CLX-${new Date().getFullYear()}-${String(certCount.count + 1).padStart(4, '0')}`;

      const validUntil = new Date();
      validUntil.setFullYear(validUntil.getFullYear() + 2);

      db.prepare(`
        INSERT INTO certificates (user_id, programme_id, enrollment_id, certificate_number, issued_at, valid_until)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(user.id, enrollment.programme_id, enrollmentId, certNumber, now, validUntil.toISOString());
    }
  } else {
    // Update progress percentage and ensure status is in_progress
    db.prepare(`
      UPDATE enrollments SET status = 'in_progress', completion_pct = ?
      WHERE id = ?
    `).run(completionPct, enrollmentId);
  }

  return NextResponse.json({
    success: true,
    completion_pct: allComplete ? 100 : completionPct,
    all_complete: allComplete,
    next_module: nextModule ? { id: nextModule.id, title: nextModule.title } : null,
  });
}
