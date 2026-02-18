import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: enrollments, error } = await supabase
    .from('enrollments')
    .select('*, programmes(title, slug, category, duration_hours, module_count, thumbnail_gradient, difficulty_level)')
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const flat = (enrollments || []).map((e: any) => ({
    id: e.id,
    user_id: e.user_id,
    programme_id: e.programme_id,
    enrolled_at: e.enrolled_at,
    status: e.status,
    completion_pct: e.completion_pct,
    completed_at: e.completed_at,
    title: e.programmes?.title,
    slug: e.programmes?.slug,
    category: e.programmes?.category,
    duration_hours: e.programmes?.duration_hours,
    module_count: e.programmes?.module_count,
    thumbnail_gradient: e.programmes?.thumbnail_gradient,
    difficulty_level: e.programmes?.difficulty_level,
  }));

  return NextResponse.json(flat);
}
