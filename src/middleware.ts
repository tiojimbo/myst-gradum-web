import { NextResponse, type NextRequest } from "next/server";

import { SITE } from "@/config/site";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";

const PUBLIC_ROUTES = ["/login", "/register", "/design-system"];
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(ACCESS_TOKEN_KEY);

  if (AUTH_ROUTES.includes(pathname) && hasSession) {
    return NextResponse.redirect(new URL(SITE.homePath, request.url));
  }

  if (!PUBLIC_ROUTES.includes(pathname) && !hasSession) {
    const loginUrl = new URL(SITE.loginPath, request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
