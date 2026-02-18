import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('user_id')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  const pathname = request.nextUrl.pathname;

  // Protect authenticated routes
  if (pathname.startsWith('/learn') || pathname.startsWith('/dashboard')) {
    if (!userId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect learners away from dashboard
  if (pathname.startsWith('/dashboard') && userRole === 'learner') {
    return NextResponse.redirect(new URL('/learn', request.url));
  }

  // Redirect HR admins away from learner portal
  if (pathname.startsWith('/learn') && (userRole === 'hr_admin' || userRole === 'climax_admin')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/learn/:path*', '/dashboard/:path*'],
};
