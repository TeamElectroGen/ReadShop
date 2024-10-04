import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Middleware function to handle authentication
export const middleware = async (request) => {
  // TODO: when deploying on Vercel add suffix: __Secure-next-auth.session-token
  const token = cookies(request).get("__Secure-next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  // Check if the user is authenticated
  if (!token) {
    // Redirect to login page if no token is present
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // Continue to the requested page if authenticated
  return NextResponse.next();
};

// Configuration for the middleware
export const config = {
  matcher: ["/api/private/:path*", "/profile/:path*"],
};
