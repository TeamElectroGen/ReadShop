import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
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
      path.startsWith("/api/private/user") &&
      (role === "user" || role === "admin" || role === "publisher")
    ) {
      return NextResponse.next();
    }

    if (
      (path.startsWith("/profile") || path.startsWith("/checkout")) &&
      role !== "user"
    ) {
      if (isApi) {
        return NextResponse.json({ message: "Unauthorized" });
      }
      return NextResponse.redirect(
        new URL(`/login?redirect=${path}`, request.url)
      );
    }

    if (
      path.startsWith("/dashboard") &&
      role !== "admin" &&
      role !== "publisher"
    ) {
      return NextResponse.redirect(new URL(`/profile`, request.url));
    }

    if (path.startsWith("/api/private") && role !== "user") {
      return NextResponse.json({ message: "Unauthorized" });
    }

    if (path.startsWith("/api/publisher") && role !== "publisher") {
      return NextResponse.json({ message: "Unauthorized" });
    }

    if (path.startsWith("/api/admin") && role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" });
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user role:", error);
    if (isApi) {
      return NextResponse.json({ message: "Unauthorized" });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/profile/:path*", // user
    "/api/private/:path*", // user
    "/checkout/:path*", // user
    "/dashboard/:path*", // admin and publisher
    "/api/admin/:path*", // admin
    "/api/publisher/:path*", // publisher
  ],
};
