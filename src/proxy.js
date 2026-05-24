// Next.js 16 renamed `middleware` to `proxy`.
// Guards every /admin/* route except /admin/login.
import { NextResponse } from 'next/server';
import { verifySession, SESSION_COOKIE } from '@/lib/auth';

export const config = {
  matcher: ['/admin/:path*'],
};

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // The login page itself must stay open.
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);
  if (!session) {
    const loginUrl = new URL('/admin/login', request.url);
    // Preserve the originally requested path so we can bounce back after login.
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
