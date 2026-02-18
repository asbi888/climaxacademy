import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const { data: certificate, error } = await supabase
    .from('certificates')
    .select('*, users(name, email), programmes(title, slug, category, thumbnail_gradient, duration_hours)')
    .eq('id', Number(id))
    .eq('user_id', user.id)
    .single();

  if (error || !certificate) {
    return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
  }

  const flat = {
    id: certificate.id,
    user_id: certificate.user_id,
    programme_id: certificate.programme_id,
    enrollment_id: certificate.enrollment_id,
    certificate_number: certificate.certificate_number,
    issued_at: certificate.issued_at,
    valid_until: certificate.valid_until,
    pdf_url: certificate.pdf_url,
    user_name: (certificate.users as any)?.name,
    user_email: (certificate.users as any)?.email,
    programme_title: (certificate.programmes as any)?.title,
    programme_slug: (certificate.programmes as any)?.slug,
    category: (certificate.programmes as any)?.category,
    thumbnail_gradient: (certificate.programmes as any)?.thumbnail_gradient,
    duration_hours: (certificate.programmes as any)?.duration_hours,
  };

  return NextResponse.json(flat);
}
