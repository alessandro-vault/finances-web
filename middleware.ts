import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { unsealData } from "iron-session/edge";
import { publicRoutes } from "./providers/auth-provider";

export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get("_finances_session");
  const path = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (publicRoutes.includes(path)) return response;

  if (!cookie) return NextResponse.redirect(new URL("/login", request.nextUrl));

  const encryptedSession = cookie?.value;

  const session = encryptedSession
    ? JSON.parse(
      await unsealData(encryptedSession, {
        password: process.env.APP_SECRET!!,
      }),
    )
    : null;

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  response.headers.set("x-authorization", `Bearer ${session.token}`);
  response.headers.set("x-url", request.nextUrl.pathname)

  return response;
}

export const config = {
  matcher: [
    "/loans/:path*",
    "/plans/:path*",
  ],
};
