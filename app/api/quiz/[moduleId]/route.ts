import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { moduleId } = await params;
  const modId = Number(moduleId);

  const { data: questions, error } = await supabase
    .from('quiz_questions')
    .select('id, module_id, question_text, option_a, option_b, option_c, option_d')
    .eq('module_id', modId);

  if (error || !questions || questions.length === 0) {
    return NextResponse.json({ error: 'No questions found' }, { status: 404 });
  }

  return NextResponse.json(questions);
}
