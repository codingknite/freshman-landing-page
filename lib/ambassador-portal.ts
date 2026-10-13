import { AMBASSADOR_LOGIN_PATH } from './ambassador-cookies';

/**
 * The ambassador dashboard's calls from the browser. Everything goes through
 * this site's own `/api/ambassador-*` routes, which hold the session in
 * httpOnly cookies; page code never sees a token. Mirrors the API's
 * `/ambassador/*` responses (api-v2 src/ambassadors/portal.ts).
 */

export type PortalProfile = {
  name: string;
  firstName: string;
  email: string;
  code: string;
  status: 'active' | 'paused' | 'pending_code' | 'removed';
  commissionRate: number;
  payoutMinimum: number;
};

export type DailyCount = { date: string; count: number };

export type PortalSummary = {
  friends: number;
  earned: number;
  available: number;
  pending: number;
  paid: number;
  nextAvailableAt: string | null;
  payoutMinimum: number;
  claimsByDay: DailyCount[];
};

export type PortalFriend = {
  id: string;
  firstName: string | null;
  plan: 'free' | 'pro' | 'max' | null;
  course: string | null;
  country: string | null;
  claimedAt: string;
};

async function messageFrom(response: Response): Promise<string> {
  const body = (await response.json().catch(() => null)) as { message?: string } | null;
  return body?.message ?? `Request failed (${response.status})`;
}

async function portalRequest<T>(path: string): Promise<T> {
  const response = await fetch(`/api/ambassador-portal${path}`, { cache: 'no-store' });
  if (response.status === 401 || response.status === 403) {
    window.location.assign(AMBASSADOR_LOGIN_PATH);
    throw new Error('Your session has ended. Sign in again.');
  }
  if (!response.ok) throw new Error(await messageFrom(response));
  return (await response.json()) as T;
}

export const fetchPortalProfile = () => portalRequest<PortalProfile>('/me');
export const fetchPortalSummary = () => portalRequest<PortalSummary>('/summary');
export const fetchPortalFriends = async () =>
  (await portalRequest<{ friends: PortalFriend[] }>('/friends')).friends;

async function post(path: string, body: unknown): Promise<void> {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(await messageFrom(response));
}

export const sendAmbassadorCode = (email: string) => post('/api/ambassador-auth/send-code', { email });
export const verifyAmbassadorCode = (email: string, code: string) =>
  post('/api/ambassador-auth/verify', { email, code });
export const signOutAmbassador = () => post('/api/ambassador-auth/signout', {});

/** Amounts are cents. */
export function formatMoney(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function displayPlan(plan: PortalFriend['plan']): string {
  if (!plan) return '—';
  return plan === 'max' ? 'Max' : plan === 'pro' ? 'Pro' : 'Free';
}

export function displayCountry(code: string | null): string {
  if (!code || code.length !== 2) return code ?? '—';
  const upper = code.toUpperCase();
  const flag = [...upper].map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65)).join('');
  let name = upper;
  try {
    name = new Intl.DisplayNames(['en'], { type: 'region' }).of(upper) ?? upper;
  } catch {
    // An unknown code is shown as is.
  }
  return `${flag} ${name}`;
}

export type ChartRange = '7d' | '30d' | '90d' | 'all';

/** The last `range` days of a daily series; `all` keeps it from the day before the first claim. */
export function filterDaily(data: DailyCount[], range: ChartRange): DailyCount[] {
  if (range === 'all') {
    const first = data.findIndex((row) => row.count > 0);
    return first <= 0 ? data : data.slice(Math.max(0, first - 1));
  }
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  return data.slice(-days);
}
