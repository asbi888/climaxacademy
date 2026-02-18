import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';

interface CertificateRow {
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
  `).get(Number(id), user.id) as CertificateRow | undefined;

  if (!certificate) {
    return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
  }

  return NextResponse.json(certificate);
}
