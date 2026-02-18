import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; moduleId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, moduleId } = await params;
  const enrollmentId = Number(id);
  const modId = Number(moduleId);

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('id', enrollmentId)
    .eq('user_id', user.id)
    .single();

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  const { data: module_ } = await supabase
    .from('modules')
    .select('*')
    .eq('id', modId)
    .eq('programme_id', enrollment.programme_id)
    .single();

  if (!module_) {
    return NextResponse.json({ error: 'Module not found' }, { status: 404 });
  }

  const { data: progress } = await supabase
    .from('module_progress')
    .select('*')
    .eq('module_id', modId)
    .eq('enrollment_id', enrollmentId)
    .maybeSingle();

  const now = new Date().toISOString();

  let quizScore: number | null = null;
  try {
    const body = await request.json();
    if (body.quiz_score !== undefined) {
      quizScore = body.quiz_score;
    }
  } catch {
    // No body or invalid JSON -- fine for non-quiz modules
  }

  if (progress) {
    const updateData: Record<string, any> = { status: 'completed', completed_at: now };
    if (quizScore !== null) updateData.quiz_score = quizScore;
    await supabase
      .from('module_progress')
      .update(updateData)
      .eq('module_id', modId)
      .eq('enrollment_id', enrollmentId);
  } else {
    await supabase.from('module_progress').insert({
      user_id: user.id,
      module_id: modId,
      enrollment_id: enrollmentId,
      status: 'completed',
      started_at: now,
      completed_at: now,
      quiz_score: quizScore,
      time_spent_minutes: 0,
    });
  }

  const { data: nextModule } = await supabase
    .from('modules')
    .select('*')
    .eq('programme_id', enrollment.programme_id)
    .gt('order_index', module_.order_index)
    .order('order_index')
    .limit(1)
    .maybeSingle();

  if (nextModule) {
    const { data: nextProgress } = await supabase
      .from('module_progress')
      .select('*')
      .eq('module_id', nextModule.id)
      .eq('enrollment_id', enrollmentId)
      .maybeSingle();

    if (nextProgress) {
      if (nextProgress.status === 'locked') {
        await supabase
          .from('module_progress')
          .update({ status: 'available', started_at: now })
          .eq('module_id', nextModule.id)
          .eq('enrollment_id', enrollmentId);
      }
    } else {
      await supabase.from('module_progress').insert({
        user_id: user.id,
        module_id: nextModule.id,
        enrollment_id: enrollmentId,
        status: 'available',
        started_at: now,
        time_spent_minutes: 0,
      });
    }
  }

  const { count: totalModules } = await supabase
    .from('modules')
    .select('*', { count: 'exact', head: true })
    .eq('programme_id', enrollment.programme_id);

  const { count: completedModules } = await supabase
    .from('module_progress')
    .select('*', { count: 'exact', head: true })
    .eq('enrollment_id', enrollmentId)
    .eq('status', 'completed');

  const total = totalModules || 0;
  const completed = completedModules || 0;
  const completionPct = total > 0
    ? Math.round((completed / total) * 1000) / 10
    : 0;

  const allComplete = completed >= total;

  if (allComplete) {
    await supabase
      .from('enrollments')
      .update({ status: 'completed', completion_pct: 100.0, completed_at: now })
      .eq('id', enrollmentId);

    const { data: existingCert } = await supabase
      .from('certificates')
      .select('id')
      .eq('enrollment_id', enrollmentId)
      .maybeSingle();

    if (!existingCert) {
      const { count: certCount } = await supabase
        .from('certificates')
        .select('*', { count: 'exact', head: true });

      const certNumber = `CLX-${new Date().getFullYear()}-${String((certCount || 0) + 1).padStart(4, '0')}`;
      const validUntil = new Date();
      validUntil.setFullYear(validUntil.getFullYear() + 2);

      await supabase.from('certificates').insert({
        user_id: user.id,
        programme_id: enrollment.programme_id,
        enrollment_id: enrollmentId,
        certificate_number: certNumber,
        issued_at: now,
        valid_until: validUntil.toISOString(),
      });
    }
  } else {
    await supabase
      .from('enrollments')
      .update({ status: 'in_progress', completion_pct: completionPct })
      .eq('id', enrollmentId);
  }

  return NextResponse.json({
    success: true,
    completion_pct: allComplete ? 100 : completionPct,
    all_complete: allComplete,
    next_module: nextModule ? { id: nextModule.id, title: nextModule.title } : null,
  });
}
