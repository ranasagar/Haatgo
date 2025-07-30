
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseIdToken');
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/admin', '/profile'];
  const isProtectedPath = protectedPaths.some(p => pathname.startsWith(p));
  
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if ((pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password') && token) {
     return NextResponse.redirect(new URL('/admin', request.url))
  }
  
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
