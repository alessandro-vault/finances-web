import { NextRequest, NextResponse } from "next/server";
import { publicRoutes } from "@/providers/auth-provider";
import { unsealData } from "iron-session/edge";

export async function AuthMiddleware(request: NextRequest) {
  let cookie = request.cookies.get("_finances_session");
  const path = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // If cookie not present and the route is not public, redirect to log in
  if (!cookie && !publicRoutes.includes(path))
    return NextResponse.redirect(new URL("/login", request.nextUrl));

  if ((!cookie && path === "/login") || (!cookie && path === "/")) {
    return response;
  }

  const encryptedSession = cookie?.value;

  const session = encryptedSession
    ? JSON.parse(
        await unsealData(encryptedSession, {
          password: process.env.APP_SECRET!!,
        }),
      )
    : null;

  response.headers.set("x-authorization", session.token);
  response.headers.set("x-url", request.nextUrl.pathname);

  if (path === "/login" || path === "/signup") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return response;
}
