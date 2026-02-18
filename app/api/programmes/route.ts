import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const db = getDb();
  let programmes;

  if (category && category !== 'All') {
    programmes = db.prepare('SELECT * FROM programmes WHERE category = ? ORDER BY id').all(category);
  } else {
    programmes = db.prepare('SELECT * FROM programmes ORDER BY id').all();
  }

  return NextResponse.json(programmes);
}
