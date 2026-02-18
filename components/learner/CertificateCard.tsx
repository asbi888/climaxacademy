import Link from 'next/link';
import { Award, Calendar, Hash, ArrowRight, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface CertificateCardData {
  id: number;
  programme_title: string;
  certificate_number: string;
  issued_at: string;
  valid_until: string;
  thumbnail_gradient: string;
  category: string;
}

interface CertificateCardProps {
  certificate: CertificateCardData;
  index?: number;
}

export default function CertificateCard({ certificate, index = 0 }: CertificateCardProps) {
  return (
    <div
      className={`glass-card overflow-hidden group transition-all duration-300 animate-slide-up stagger-${Math.min(index + 1, 6)}`}
    >
      {/* Gradient bar at top */}
      <div
        className="h-2 w-full"
        style={{ background: certificate.thumbnail_gradient }}
      />

      <div className="p-6">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            <Award className="w-3 h-3" />
            {certificate.category}
          </span>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-sky-400" />
          </div>
        </div>

        {/* Programme title */}
        <h3 className="text-lg font-semibold text-brand-text mb-4 line-clamp-2 min-h-[3.5rem]">
          {certificate.programme_title}
        </h3>

        {/* Certificate details */}
        <div className="space-y-2.5 mb-6">
          <div className="flex items-center gap-2 text-sm text-brand-muted">
            <Hash className="w-3.5 h-3.5 text-brand-accent/60" />
            <span className="font-mono text-xs tracking-wide">{certificate.certificate_number}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-muted">
            <Calendar className="w-3.5 h-3.5 text-brand-accent/60" />
            <span>Issued: {formatDate(certificate.issued_at)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-muted">
            <Calendar className="w-3.5 h-3.5 text-brand-emerald/60" />
            <span>Valid until: {formatDate(certificate.valid_until)}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Link
            href={`/learn/certificates/${certificate.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-accent to-sky-600 text-white hover:shadow-lg hover:shadow-brand-accent/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            View Certificate
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/learn/certificates/${certificate.id}?download=true`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-brand-muted hover:border-brand-accent/30 hover:text-brand-accent hover:bg-brand-accent/5 transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
