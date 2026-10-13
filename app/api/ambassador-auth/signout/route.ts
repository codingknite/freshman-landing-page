import { NextResponse, type NextRequest } from 'next/server';
import { AMBASSADOR_ACCESS_COOKIE, AMBASSADOR_REFRESH_COOKIE } from '@/lib/ambassador-cookies';
import { callApi, clearSessionCookies, refreshSession } from '@/lib/ambassador-session';

/** Ends the ambassador's session at the API, then drops the cookies whatever it says. */
export async function POST(request: NextRequest) {
  let accessToken = request.cookies.get(AMBASSADOR_ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(AMBASSADOR_REFRESH_COOKIE)?.value;
  if (!accessToken && refreshToken) {
    accessToken = (await refreshSession(refreshToken).catch(() => null))?.access_token;
  }
  if (accessToken) {
    await callApi('/ambassador/signout', { method: 'POST', body: {}, accessToken }).catch(() => null);
  }

  const response = NextResponse.json({ signedOut: true });
  clearSessionCookies(response);
  return response;
}
