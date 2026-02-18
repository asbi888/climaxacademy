import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';
import { ArrowLeft, Award, Calendar, Hash } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import CertificatePreview from '@/components/learner/CertificatePreview';

interface CertificateDetailRow {
  id: number;
  user_id: number;
  programme_id: number;
  enrollment_id: number;
  certificate_number: string;
  issued_at: string;
  valid_until: string;
  pdf_url: string | null;
  user_name: string;
  user_email: string;
  programme_title: string;
  programme_slug: string;
  category: string;
  thumbnail_gradient: string;
  duration_hours: number;
}

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { id } = await params;
  const db = getDb();

  const certificate = db.prepare(`
    SELECT c.*,
           u.name as user_name, u.email as user_email,
           p.title as programme_title, p.slug as programme_slug,
           p.category, p.thumbnail_gradient, p.duration_hours
    FROM certificates c
    JOIN users u ON c.user_id = u.id
    JOIN programmes p ON c.programme_id = p.id
    WHERE c.id = ? AND c.user_id = ?
  `).get(Number(id), user.id) as CertificateDetailRow | undefined;

  if (!certificate) notFound();

  return (
    <div className="space-y-8">
      {/* Back link and header */}
      <div className="animate-slide-up">
        <Link
          href="/learn/certificates"
          className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-accent transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Certificates
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-brand-accent" />
              </div>
              <h1 className="text-2xl font-bold text-brand-text">
                {certificate.programme_title}
              </h1>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm text-brand-muted">
              <span className="inline-flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-brand-accent/60" />
                <span className="font-mono text-xs">{certificate.certificate_number}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-accent/60" />
                Issued {formatDate(certificate.issued_at)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-emerald/60" />
                Valid until {formatDate(certificate.valid_until)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate preview with download */}
      <div className="animate-slide-up stagger-1">
        <CertificatePreview
          certificate={{
            id: certificate.id,
            certificate_number: certificate.certificate_number,
            issued_at: certificate.issued_at,
            valid_until: certificate.valid_until,
          }}
          userName={certificate.user_name}
          programmeTitle={certificate.programme_title}
        />
      </div>
    </div>
  );
}
