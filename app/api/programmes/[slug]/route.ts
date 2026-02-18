import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const db = getDb();

  const programme = db.prepare('SELECT * FROM programmes WHERE slug = ?').get(slug);

  if (!programme) {
    return NextResponse.json({ error: 'Programme not found' }, { status: 404 });
  }

  const modules = db.prepare(
    'SELECT * FROM modules WHERE programme_id = ? ORDER BY order_index'
  ).all((programme as any).id);

  return NextResponse.json({ ...(programme as any), modules });
}
