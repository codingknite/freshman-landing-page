import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isSupportedLocale } from '@/lib/i18n';
import {
  AMBASSADOR_ACCESS_COOKIE,
  AMBASSADOR_DASHBOARD_PATH,
  AMBASSADOR_LOGIN_PATH,
  AMBASSADOR_REFRESH_COOKIE,
} from '@/lib/ambassador-cookies';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // The ambassador dashboard lives outside the language routes
  // (joinfreshman.com/ambassador-dashboard). Signed-out visitors go to its
  // sign-in; this only checks a cookie exists, the API decides the rest.
  if (pathname === AMBASSADOR_DASHBOARD_PATH || pathname.startsWith(`${AMBASSADOR_DASHBOARD_PATH}/`)) {
    const signedIn =
      Boolean(request.cookies.get(AMBASSADOR_ACCESS_COOKIE)?.value) ||
      Boolean(request.cookies.get(AMBASSADOR_REFRESH_COOKIE)?.value);
    const onLogin = pathname === AMBASSADOR_LOGIN_PATH;
    if (!signedIn && !onLogin) return NextResponse.redirect(new URL(AMBASSADOR_LOGIN_PATH, request.url));
    if (signedIn && onLogin) return NextResponse.redirect(new URL(AMBASSADOR_DASHBOARD_PATH, request.url));
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] ?? '';

  if (isSupportedLocale(firstSegment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', firstSegment);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.headers.set('x-locale', firstSegment);
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
