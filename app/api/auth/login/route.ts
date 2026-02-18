import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const user = validateCredentials(email, password);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, role: user.role },
      redirect: user.role === 'learner' ? '/learn' : '/dashboard',
    });

    // Set cookies
    response.cookies.set('user_id', String(user.id), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    response.cookies.set('user_role', user.role, {
      httpOnly: false, // Readable by client for UI
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
