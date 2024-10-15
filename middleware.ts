import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Redirect unauthenticated users to sign-in page
  if (!session && pathname !== "/auth/sign-in") {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Redirect authenticated users away from sign-in page
  if (session && pathname === "/auth/sign-in") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/projects",
    "/projects/connect-repo",
    "/auth/sign-in",
    "/api/get-web-hooks",
  ],
};
