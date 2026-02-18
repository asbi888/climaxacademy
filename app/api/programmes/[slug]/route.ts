import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data: programme, error } = await supabase
    .from('programmes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !programme) {
    return NextResponse.json({ error: 'Programme not found' }, { status: 404 });
  }

  const { data: modules } = await supabase
    .from('modules')
    .select('*')
    .eq('programme_id', programme.id)
    .order('order_index');

  return NextResponse.json({ ...programme, modules: modules || [] });
}
