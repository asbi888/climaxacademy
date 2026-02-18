'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface MarkCompleteButtonProps {
  enrollmentId: number;
  moduleId: number;
  programmeSlug: string;
}

export default function MarkCompleteButton({
  enrollmentId,
  moduleId,
  programmeSlug,
}: MarkCompleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleComplete = async () => {
    if (loading || completed) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/enrollments/${enrollmentId}/modules/${moduleId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        setCompleted(true);
        // Redirect to programme page after brief feedback
        setTimeout(() => {
          window.location.href = `/learn/programme/${programmeSlug}`;
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to mark module as complete:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleComplete}
      disabled={loading || completed}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
        completed
          ? 'bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30'
          : 'bg-gradient-to-r from-brand-emerald to-teal-400 text-white hover:shadow-lg hover:shadow-brand-emerald/20 hover:-translate-y-0.5'
      } disabled:cursor-not-allowed disabled:transform-none`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Saving...
        </>
      ) : completed ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          Completed!
        </>
      ) : (
        <>
          <CheckCircle2 className="w-4 h-4" />
          Mark as Complete
        </>
      )}
    </button>
  );
}
