import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
import { Award, Trophy } from 'lucide-react';
import CertificateCard, { type CertificateCardData } from '@/components/learner/CertificateCard';

interface CertificateRow {
  id: number;
  user_id: number;
  programme_id: number;
  enrollment_id: number;
  certificate_number: string;
  issued_at: string;
  valid_until: string;
  pdf_url: string | null;
  programme_title: string;
  programme_slug: string;
  category: string;
  thumbnail_gradient: string;
}

export default async function CertificatesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const db = getDb();
  const certificates = db.prepare(`
    SELECT c.*, p.title as programme_title, p.slug as programme_slug,
           p.category, p.thumbnail_gradient
    FROM certificates c
    JOIN programmes p ON c.programme_id = p.id
    WHERE c.user_id = ?
    ORDER BY c.issued_at DESC
  `).all(user.id) as CertificateRow[];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-text">My Certificates</h1>
            <p className="text-sm text-brand-muted">Your earned certifications and achievements</p>
          </div>
        </div>
      </div>

      {/* Certificate grid or empty state */}
      {certificates.length === 0 ? (
        <div className="glass-card p-16 text-center animate-slide-up stagger-1">
          <div className="w-20 h-20 rounded-2xl bg-sky-500/10 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-sky-400/60" />
          </div>
          <h3 className="text-xl font-semibold text-brand-text mb-3">
            No certificates yet
          </h3>
          <p className="text-brand-muted text-sm max-w-md mx-auto leading-relaxed">
            Complete a programme to earn your first certificate. Your certifications will appear here as proof of your training achievements.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert, idx) => (
            <CertificateCard
              key={cert.id}
              certificate={cert as CertificateCardData}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}
