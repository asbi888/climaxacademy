import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';
import { ArrowLeft, Award, Calendar, Hash } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import CertificatePreview from '@/components/learner/CertificatePreview';

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { id } = await params;

  const { data: cert } = await supabase
    .from('certificates')
    .select('*, users(name, email), programmes(title, slug, category, thumbnail_gradient, duration_hours)')
    .eq('id', Number(id))
    .eq('user_id', user.id)
    .single();

  if (!cert) notFound();

  const certificate = {
    id: cert.id,
    user_id: cert.user_id,
    programme_id: cert.programme_id,
    enrollment_id: cert.enrollment_id,
    certificate_number: cert.certificate_number,
    issued_at: cert.issued_at,
    valid_until: cert.valid_until,
    pdf_url: cert.pdf_url,
    user_name: (cert.users as any)?.name,
    user_email: (cert.users as any)?.email,
    programme_title: (cert.programmes as any)?.title,
    programme_slug: (cert.programmes as any)?.slug,
    category: (cert.programmes as any)?.category,
    thumbnail_gradient: (cert.programmes as any)?.thumbnail_gradient,
    duration_hours: (cert.programmes as any)?.duration_hours,
  };

  return (
    <div className="space-y-8">
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
