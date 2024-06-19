import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/api/:path*",
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;

  if (path === "/api/auth/session") {
    return NextResponse.next();
  }

  /**const authenticated = await isAuthenticated(request);
  console.log("Authentication status:", authenticated);

  if (!authenticated) {
    console.log("Not authenticated, blocking access.");
    return NextResponse.json(
      { success: false, message: "Not Authorized" },
      { status: 401 }
    );
  }

  console.log("Authenticated, allowing access.");
  return NextResponse.next(); */
  console.log(url);
}
