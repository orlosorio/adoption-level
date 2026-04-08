import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only protect /admin routes (except /admin/login)
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    // Token existence check only — full validation happens in API routes
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
