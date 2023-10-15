import type { NextRequest } from "next/server";
import { AuthMiddleware } from "@/middlewares/auth-middleware";

export async function middleware(request: NextRequest) {
  return AuthMiddleware(request);
}

export const config = {
  matcher: ["/", "/login", "/loans/:path*", "/plans/:path*", "/calculate"],
};
