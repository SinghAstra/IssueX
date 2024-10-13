import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define a secret to decode the JWT
const secret = process.env.NEXT_AUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  console.log("token --middleware is ", token);
  const { pathname } = req.nextUrl;
  console.log("pathname is ", pathname);

  // Check if user is authenticated
  const isAuthenticated = !!token;
  console.log("isAuthenticated is ", isAuthenticated);

  // Redirect unauthenticated users from protected routes like /dashboard
  //   if (!isAuthenticated && pathname.startsWith("/dashboard")) {
  //     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  //   }

  // Redirect authenticated users away from auth routes like /auth/sign-in
  if (isAuthenticated && pathname.startsWith("/auth/sign-in")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/dashboard/:path*",
    "/auth/sign-in",
  ],
};
