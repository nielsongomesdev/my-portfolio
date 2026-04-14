import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";

export default async function middleware(request: NextRequest) {
  const intlMiddleware = createMiddleware(routing);
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
