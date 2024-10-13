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

  // Redirect authenticated users away from auth routes like /auth/sign-in
  if (isAuthenticated && pathname.startsWith("/auth/sign-in")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/projects", "/auth/sign-in"],
};
