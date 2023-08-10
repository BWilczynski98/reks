import { Role } from "@prisma/client"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith("/admin") && request.nextauth.token?.role !== Role.ADMIN) {
      return NextResponse.rewrite(new URL("/denied", request.url))
    }
  },
  { callbacks: { authorized: ({ token }) => !!token } }
)
// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/dashboard", "/admin"] }
