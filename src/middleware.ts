
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = new Set([
  '/',
  '/login',
  '/signup',
  '/forgot-password',
]);

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseIdToken');
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/profile');
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password');

  // Handle protected routes
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Handle auth pages for logged-in users
  if (isAuthRoute && token) {
     return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Allow dynamic product routes
  if (pathname.startsWith('/products/')) {
    return NextResponse.next();
  }

  // Handle other known public routes
  if (publicRoutes.has(pathname)) {
    return NextResponse.next();
  }

  // Allow all admin routes if authenticated
  if (pathname.startsWith('/admin') && token) {
    return NextResponse.next();
  }
  
  // If a route is not explicitly public or a dynamic product page,
  // and it's not an admin route being accessed by an authenticated user,
  // we can consider it unknown. For now, let's be more permissive to avoid incorrect redirects.
  // The protected route logic above should handle security.
  
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
