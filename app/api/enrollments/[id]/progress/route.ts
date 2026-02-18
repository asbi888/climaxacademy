import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const enrollmentId = Number(id);

  const { data: enrollment, error: enrollError } = await supabase
    .from('enrollments')
    .select('*, programmes(title, slug, category, duration_hours, module_count, thumbnail_gradient, difficulty_level)')
    .eq('id', enrollmentId)
    .eq('user_id', user.id)
    .single();

  if (enrollError || !enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  const flatEnrollment = {
    id: enrollment.id,
    user_id: enrollment.user_id,
    programme_id: enrollment.programme_id,
    enrolled_at: enrollment.enrolled_at,
    status: enrollment.status,
    completion_pct: enrollment.completion_pct,
    completed_at: enrollment.completed_at,
    title: (enrollment.programmes as any)?.title,
    slug: (enrollment.programmes as any)?.slug,
    category: (enrollment.programmes as any)?.category,
    duration_hours: (enrollment.programmes as any)?.duration_hours,
    module_count: (enrollment.programmes as any)?.module_count,
    thumbnail_gradient: (enrollment.programmes as any)?.thumbnail_gradient,
    difficulty_level: (enrollment.programmes as any)?.difficulty_level,
  };

  const { data: modules } = await supabase
    .from('modules')
    .select('*')
    .eq('programme_id', enrollment.programme_id)
    .order('order_index');

  const { data: progressRecords } = await supabase
    .from('module_progress')
    .select('*')
    .eq('enrollment_id', enrollmentId);

  const progressMap = new Map<number, any>();
  for (const p of progressRecords || []) {
    progressMap.set(p.module_id, p);
  }

  const modulesWithProgress = (modules || []).map((m: any) => {
    const prog = progressMap.get(m.id);
    return {
      ...m,
      progress_status: prog?.status || null,
      started_at: prog?.started_at || null,
      completed_at: prog?.completed_at || null,
      quiz_score: prog?.quiz_score || null,
      time_spent_minutes: prog?.time_spent_minutes || 0,
    };
  });

  return NextResponse.json({
    enrollment: flatEnrollment,
    modules: modulesWithProgress,
  });
}
