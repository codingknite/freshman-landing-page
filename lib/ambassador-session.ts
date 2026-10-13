import type { NextResponse } from 'next/server';
import { AMBASSADOR_ACCESS_COOKIE, AMBASSADOR_REFRESH_COOKIE } from './ambassador-cookies';

/**
 * The ambassador dashboard's session, held on this site's server (moved here
 * from the internal dashboard so ambassadors use joinfreshman.com).
 *
 * The browser only holds two httpOnly cookies; every call to the Freshman API
 * goes through a route handler in `app/api/ambassador-*`, which attaches the
 * token server-side and refreshes it when it expires. Page JavaScript never
 * sees a token. Whether the email is in the program is decided by the API on
 * every call.
 *
 * Server-only: imported by route handlers, never by a page.
 */

export type ApiSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
};

export type ApiReply = { status: number; body: unknown };

/** Refresh tokens are long-lived; ambassadors sign in again after 30 days. */
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

function apiBaseUrl(): string {
  const base = process.env.FRESHMAN_API_URL?.trim();
  if (!base) throw new Error('FRESHMAN_API_URL is not set');
  return base.replace(/\/+$/, '');
}

export function setSessionCookies(response: NextResponse, session: ApiSession): void {
  const accessMaxAge = session.expires_at
    ? Math.max(60, session.expires_at - Math.floor(Date.now() / 1000))
    : 60 * 60;
  response.cookies.set(AMBASSADOR_ACCESS_COOKIE, session.access_token, { ...cookieOptions, maxAge: accessMaxAge });
  response.cookies.set(AMBASSADOR_REFRESH_COOKIE, session.refresh_token, { ...cookieOptions, maxAge: REFRESH_MAX_AGE });
}

export function clearSessionCookies(response: NextResponse): void {
  response.cookies.set(AMBASSADOR_ACCESS_COOKIE, '', { ...cookieOptions, maxAge: 0 });
  response.cookies.set(AMBASSADOR_REFRESH_COOKIE, '', { ...cookieOptions, maxAge: 0 });
}

export async function callApi(
  path: string,
  init: { method?: string; body?: unknown; accessToken?: string } = {},
): Promise<ApiReply> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (init.body !== undefined) headers['Content-Type'] = 'application/json';
  if (init.accessToken) headers.Authorization = `Bearer ${init.accessToken}`;

  const response = await fetch(`${apiBaseUrl()}${path}`, {
    method: init.method ?? 'GET',
    headers,
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: 'no-store',
  });
  if (response.status === 404 || response.status >= 500) {
    console.error(`ambassador-dashboard: ${init.method ?? 'GET'} ${path} -> ${response.status}`);
  }
  const text = await response.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { message: text.slice(0, 200) };
    }
  }
  return { status: response.status, body };
}

export async function refreshSession(refreshToken: string): Promise<ApiSession | null> {
  const reply = await callApi('/auth/refresh', { method: 'POST', body: { refresh_token: refreshToken } });
  if (reply.status !== 200) return null;
  const session = (reply.body as { session?: ApiSession } | null)?.session;
  return session?.access_token && session.refresh_token ? session : null;
}
