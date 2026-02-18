import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let query = supabase.from('programmes').select('*').order('id');

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  const { data: programmes, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(programmes);
}
