import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isSupportedLocale } from '@/lib/i18n';

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
