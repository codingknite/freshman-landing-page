import { NextResponse, type NextRequest } from 'next/server';
import { AMBASSADOR_ACCESS_COOKIE, AMBASSADOR_REFRESH_COOKIE } from '@/lib/ambassador-cookies';
import {
  callApi,
  clearSessionCookies,
  refreshSession,
  setSessionCookies,
  type ApiSession,
} from '@/lib/ambassador-session';

/**
 * The only way the ambassador dashboard reaches the API.
 *
 * Forwards `/api/ambassador-portal/<path>` to the API's `/ambassador/<path>`
 * with the ambassador's session. Fixed to that prefix and read-only, so an
 * ambassador's token can't be pointed at any other route from here. An expired
 * access token is refreshed once and the call retried.
 */

const SEGMENT = /^[A-Za-z0-9_-]+$/;

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  if (!path.every((segment) => SEGMENT.test(segment))) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
  const apiPath = `/ambassador/${path.join('/')}${request.nextUrl.search}`;

  let accessToken = request.cookies.get(AMBASSADOR_ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(AMBASSADOR_REFRESH_COOKIE)?.value;
  let refreshed: ApiSession | null = null;

  if (!accessToken && refreshToken) {
    refreshed = await refreshSession(refreshToken).catch(() => null);
    accessToken = refreshed?.access_token;
  }
  if (!accessToken) {
    const response = NextResponse.json({ message: 'Your session has ended. Sign in again.' }, { status: 401 });
    clearSessionCookies(response);
    return response;
  }

  let reply: Awaited<ReturnType<typeof callApi>>;
  try {
    reply = await callApi(apiPath, { accessToken });
    if (reply.status === 401 && refreshToken && !refreshed) {
      refreshed = await refreshSession(refreshToken);
      if (refreshed) reply = await callApi(apiPath, { accessToken: refreshed.access_token });
    }
  } catch (error) {
    console.error('ambassador-dashboard: API unreachable', error);
    return NextResponse.json({ message: "Couldn't load your page. Try again in a moment." }, { status: 502 });
  }

  const response = NextResponse.json(reply.body ?? {}, { status: reply.status });
  // A 403 means the email is no longer in the program: end the session too.
  if (reply.status === 401 || reply.status === 403) clearSessionCookies(response);
  else if (refreshed) setSessionCookies(response, refreshed);
  return response;
}
