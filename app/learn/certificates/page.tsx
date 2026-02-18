import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';
import { Award, Trophy } from 'lucide-react';
import CertificateCard, { type CertificateCardData } from '@/components/learner/CertificateCard';

export default async function CertificatesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { data: certificates } = await supabase
    .from('certificates')
    .select('*, programmes(title, slug, category, thumbnail_gradient)')
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false });

  const flat = (certificates || []).map((c: any) => ({
    id: c.id,
    user_id: c.user_id,
    programme_id: c.programme_id,
    enrollment_id: c.enrollment_id,
    certificate_number: c.certificate_number,
    issued_at: c.issued_at,
    valid_until: c.valid_until,
    pdf_url: c.pdf_url,
    programme_title: c.programmes?.title,
    programme_slug: c.programmes?.slug,
    category: c.programmes?.category,
    thumbnail_gradient: c.programmes?.thumbnail_gradient,
  }));

  return (
    <div className="space-y-8">
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

      {flat.length === 0 ? (
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
          {flat.map((cert: any, idx: number) => (
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
