import { isAuthenticated } from "@lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/api/:path*",
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;

  console.log("Middleware invoked for path:", path);

  if (path === "/api/auth/session") {
    console.log("Login path detected, bypassing authentication.");
    return NextResponse.next();
  }

  const authenticated = await isAuthenticated(request);
  console.log("Authentication status:", authenticated);

  if (!authenticated) {
    console.log("Not authenticated, blocking access.");
    return NextResponse.json(
      { success: false, message: "Not Authorized" },
      { status: 401 }
    );
  }

  console.log("Authenticated, allowing access.");
  return NextResponse.next();
}
