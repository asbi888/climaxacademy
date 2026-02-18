import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
import type { QuizQuestion } from '@/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { moduleId } = await params;
  const modId = Number(moduleId);

  const db = getDb();

  const questions = db.prepare(`
    SELECT id, module_id, question_text, option_a, option_b, option_c, option_d
    FROM quiz_questions
    WHERE module_id = ?
  `).all(modId) as Omit<QuizQuestion, 'correct_option' | 'explanation'>[];

  if (questions.length === 0) {
    return NextResponse.json({ error: 'No questions found' }, { status: 404 });
  }

  return NextResponse.json(questions);
}
