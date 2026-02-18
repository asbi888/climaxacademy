'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Loader2, Trophy, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string | null;
  option_d: string | null;
}

interface QuizResult {
  questionId: number;
  questionText: string;
  userAnswer: string | null;
  correctOption: string;
  isCorrect: boolean;
  explanation: string;
  options: {
    a: string;
    b: string;
    c: string | null;
    d: string | null;
  };
}

interface QuizSubmitResponse {
  score: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
  results: QuizResult[];
}

interface QuizViewProps {
  moduleId: number;
  enrollmentId: number;
  questions: QuizQuestion[];
  programmeSlug: string;
}

const optionLabels: Record<string, string> = { a: 'A', b: 'B', c: 'C', d: 'D' };

export default function QuizView({ moduleId, enrollmentId, questions, programmeSlug }: QuizViewProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<QuizSubmitResponse | null>(null);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const allAnswered = questions.every((q) => answers[String(q.id)]);

  const handleSelect = (questionId: number, option: string) => {
    if (results) return; // Don't allow changes after submission
    setAnswers((prev) => ({ ...prev, [String(questionId)]: option }));
  };

  const handleSubmit = async () => {
    if (!allAnswered || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, answers }),
      });
      const data: QuizSubmitResponse = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Failed to submit quiz:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async () => {
    if (!results || completing) return;
    setCompleting(true);

    try {
      await fetch(`/api/enrollments/${enrollmentId}/modules/${moduleId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quiz_score: results.score }),
      });
      setCompleted(true);
      // Redirect to programme page after a brief moment
      setTimeout(() => {
        window.location.href = `/learn/programme/${programmeSlug}`;
      }, 1500);
    } catch (err) {
      console.error('Failed to complete module:', err);
    } finally {
      setCompleting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setResults(null);
  };

  // Get option text for a given question and option key
  const getOptionText = (q: QuizQuestion, key: string) => {
    switch (key) {
      case 'a': return q.option_a;
      case 'b': return q.option_b;
      case 'c': return q.option_c;
      case 'd': return q.option_d;
      default: return '';
    }
  };

  // Build the options array for a question
  const getOptions = (q: QuizQuestion) => {
    const opts: { key: string; text: string }[] = [
      { key: 'a', text: q.option_a },
      { key: 'b', text: q.option_b },
    ];
    if (q.option_c) opts.push({ key: 'c', text: q.option_c });
    if (q.option_d) opts.push({ key: 'd', text: q.option_d });
    return opts;
  };

  return (
    <div className="space-y-8">
      {/* Results overlay */}
      {results && (
        <div className={`glass-card p-8 text-center animate-slide-up ${
          results.passed ? 'border-brand-emerald/30' : 'border-red-400/30'
        }`}>
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
            results.passed ? 'bg-brand-emerald/10' : 'bg-red-400/10'
          }`}>
            {results.passed ? (
              <Trophy className="w-10 h-10 text-brand-emerald" />
            ) : (
              <XCircle className="w-10 h-10 text-red-400" />
            )}
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${results.passed ? 'text-brand-emerald' : 'text-red-400'}`}>
            {results.score}%
          </h3>
          <p className="text-brand-muted mb-1">
            {results.correctCount} of {results.totalQuestions} correct
          </p>
          <p className={`text-sm font-medium mb-6 ${results.passed ? 'text-brand-emerald' : 'text-red-400'}`}>
            {results.passed
              ? 'Congratulations! You passed the quiz.'
              : 'You need 70% or higher to pass. Review the material and try again.'}
          </p>
          <div className="flex items-center justify-center gap-3">
            {results.passed ? (
              <button
                onClick={handleComplete}
                disabled={completing || completed}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-emerald to-teal-400 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-brand-emerald/20 disabled:opacity-50"
              >
                {completing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : completed ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                {completed ? 'Completed!' : completing ? 'Saving...' : 'Continue'}
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 text-brand-text font-semibold hover:bg-slate-100 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            )}
          </div>
        </div>
      )}

      {/* Questions */}
      {questions.map((q, qIdx) => {
        const options = getOptions(q);
        const selectedAnswer = answers[String(q.id)];
        const result = results?.results.find((r) => r.questionId === q.id);

        return (
          <div
            key={q.id}
            className={`glass-card p-6 transition-all duration-300 ${
              result
                ? result.isCorrect
                  ? 'border-brand-emerald/20'
                  : 'border-red-400/20'
                : ''
            }`}
          >
            <div className="flex items-start gap-3 mb-5">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm font-bold text-brand-muted">
                {qIdx + 1}
              </span>
              <h4 className="text-brand-text font-medium leading-relaxed pt-1">
                {q.question_text}
              </h4>
            </div>

            <div className="space-y-3 ml-11">
              {options.map((opt) => {
                const isSelected = selectedAnswer === opt.key;
                const isCorrect = result && opt.key === result.correctOption;
                const isWrong = result && isSelected && !result.isCorrect;

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelect(q.id, opt.key)}
                    disabled={!!results}
                    className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                      result
                        ? isCorrect
                          ? 'border-brand-emerald/40 bg-brand-emerald/5'
                          : isWrong
                          ? 'border-red-400/40 bg-red-400/5'
                          : 'border-slate-200 bg-transparent opacity-60'
                        : isSelected
                        ? 'border-brand-accent/40 bg-brand-accent/5'
                        : 'border-slate-200 bg-transparent hover:border-slate-300 hover:bg-slate-50'
                    } disabled:cursor-default`}
                  >
                    <span
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                        result
                          ? isCorrect
                            ? 'bg-brand-emerald/20 text-brand-emerald'
                            : isWrong
                            ? 'bg-red-400/20 text-red-400'
                            : 'bg-slate-50 text-brand-muted'
                          : isSelected
                          ? 'bg-brand-accent/20 text-brand-accent'
                          : 'bg-slate-50 text-brand-muted'
                      }`}
                    >
                      {optionLabels[opt.key]}
                    </span>
                    <span className={`text-sm ${
                      result
                        ? isCorrect
                          ? 'text-brand-emerald font-medium'
                          : isWrong
                          ? 'text-red-400'
                          : 'text-brand-muted'
                        : isSelected
                        ? 'text-brand-text'
                        : 'text-brand-muted'
                    }`}>
                      {opt.text}
                    </span>
                    {result && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-brand-emerald ml-auto shrink-0" />
                    )}
                    {result && isWrong && (
                      <XCircle className="w-4 h-4 text-red-400 ml-auto shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation after submission */}
            {result && (
              <div className={`mt-4 ml-11 p-4 rounded-xl text-sm ${
                result.isCorrect
                  ? 'bg-brand-emerald/5 border border-brand-emerald/10 text-brand-emerald/80'
                  : 'bg-sky-50 border border-sky-200 text-sky-700'
              }`}>
                <span className="font-medium">
                  {result.isCorrect ? 'Correct!' : 'Explanation:'}
                </span>{' '}
                {result.explanation}
              </div>
            )}
          </div>
        );
      })}

      {/* Submit button */}
      {!results && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-sky-600 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-brand-accent/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Quiz
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {!results && !allAnswered && (
        <p className="text-center text-sm text-brand-muted">
          Answer all {questions.length} questions to submit the quiz
        </p>
      )}
    </div>
  );
}
