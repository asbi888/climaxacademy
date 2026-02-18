import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: certificates, error } = await supabase
    .from('certificates')
    .select('*, programmes(title, slug, category, thumbnail_gradient)')
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const flat = (certificates || []).map((c: any) => ({
    ...c,
    programme_title: c.programmes?.title,
    programme_slug: c.programmes?.slug,
    category: c.programmes?.category,
    thumbnail_gradient: c.programmes?.thumbnail_gradient,
    programmes: undefined,
  }));

  return NextResponse.json(flat);
}
