import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
import type { QuizQuestion } from '@/db';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { moduleId, answers } = body as {
    moduleId: number;
    answers: Record<string, string>;
  };

  if (!moduleId || !answers) {
    return NextResponse.json({ error: 'moduleId and answers are required' }, { status: 400 });
  }

  const db = getDb();

  // Fetch all quiz questions for this module
  const questions = db.prepare(`
    SELECT * FROM quiz_questions WHERE module_id = ?
  `).all(moduleId) as QuizQuestion[];

  if (questions.length === 0) {
    return NextResponse.json({ error: 'No quiz questions found for this module' }, { status: 404 });
  }

  // Grade answers
  let correctCount = 0;
  const results = questions.map((q) => {
    const userAnswer = answers[String(q.id)];
    const isCorrect = userAnswer?.toLowerCase() === q.correct_option.toLowerCase();
    if (isCorrect) correctCount++;

    return {
      questionId: q.id,
      questionText: q.question_text,
      userAnswer: userAnswer || null,
      correctOption: q.correct_option,
      isCorrect,
      explanation: q.explanation,
      options: {
        a: q.option_a,
        b: q.option_b,
        c: q.option_c,
        d: q.option_d,
      },
    };
  });

  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= 70;

  return NextResponse.json({
    score,
    passed,
    correctCount,
    totalQuestions: questions.length,
    results,
  });
}
