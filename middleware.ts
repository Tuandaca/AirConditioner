import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Allow access to login page
    if (req.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.next()
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow login page without token
        if (req.nextUrl.pathname.startsWith('/admin/login')) {
          return true
        }
        // Require token for other admin routes
        return !!token
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
