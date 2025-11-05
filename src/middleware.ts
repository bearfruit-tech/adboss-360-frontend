import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the bearer token from cookies
  const token = request.cookies.get('bearer-token')
  const isAuthenticated = !!token?.value

  // Define public routes (accessible without authentication)
  const publicRoutes = ['/sign-in', '/sign-up', '/company-signup', '/company-invite']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) ||
                        pathname.startsWith('/accept-invitation/')

  // Define protected routes (require authentication)
  const protectedRoutes = ['/dashboard', '/branding', '/marketing-research', '/digital-marketing-campaign', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is authenticated and on root, redirect to dashboard
  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is not authenticated and trying to access protected routes, redirect to sign-in
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)',
  ],
}
