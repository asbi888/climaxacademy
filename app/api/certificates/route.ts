import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/db';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const certificates = db.prepare(`
    SELECT c.*, p.title as programme_title, p.slug as programme_slug,
           p.category, p.thumbnail_gradient
    FROM certificates c
    JOIN programmes p ON c.programme_id = p.id
    WHERE c.user_id = ?
    ORDER BY c.issued_at DESC
  `).all(user.id);

  return NextResponse.json(certificates);
}
