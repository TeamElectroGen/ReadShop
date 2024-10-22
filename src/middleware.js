import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getUserRole } from "./services/getUserData";

const secret = process.env.NEXT_PUBLIC_AUTH_SECRET;

export async function middleware(request) {
  const token = await getToken({ req: request, secret });
  const path = request.nextUrl.pathname;
  const isApi = path.includes("/api/");

  if (path.startsWith("/api/private/get-user-role")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${path}`, request.url)
    );
  }

  try {
    const { role } = await getUserRole(token.email);

    if (
      (path.startsWith("/profile") || path.startsWith("/checkout")) &&
      role !== "user"
    ) {
      if (isApi) {
        return NextResponse.json({ message: "Unauthorized" });
      }
      return NextResponse.redirect(new URL(`/unauthorized`, request.url));
    }

    if (path.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(`/unauthorized`, request.url));
    }

    if (path.startsWith("/publisher") && role !== "publisher") {
      return NextResponse.redirect(new URL(`/unauthorized`, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/profile/:path*", // user
    "/api/private/:path*", // user
    "/checkout/:path*", // user
    "/dashboard/admin/:path*", // admin
    "/api/admin/:path*", // admin
    "/dashboard/publisher/:path*", // publisher
    "/api/publisher/:path*", // publisher
  ],
};
