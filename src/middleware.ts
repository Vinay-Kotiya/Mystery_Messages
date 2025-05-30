import { NextResponse, NextRequest } from "next/server";
// import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/"))
  ) {
    // console.log("Token found, redirecting to dashboard");
    if (!token && url.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();

    // return NextResponse.redirect(new URL("/home", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-up", "/sign-in", "/", "/dashboard/:path*", "/verify/:path*"],
};
