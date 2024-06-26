export { auth } from '@/auth/auth';
import { NextRequest, NextResponse } from 'next/server';
const protectedRoutes = ['/'];

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('authjs.session-token')?.value;

  if (
    (!session && req.nextUrl.pathname.startsWith('/user')) ||
    (!session && protectedRoutes.includes(req.nextUrl.pathname))
  ) {
    const url = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  if (session && req.nextUrl.pathname === '/login') {
    const url = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
