import type { PublicRound } from './supporters-round';

/**
 * Server-side calls to the Freshman API for the supporters round. The API's
 * URL stays on the server; the page only talks to this site's own routes.
 */

export function apiUrl(): string | null {
  return process.env.FRESHMAN_API_URL?.replace(/\/+$/, '') ?? null;
}

export const INVITE_CODE = /^[A-Za-z0-9-]{3,40}$/;

export type RoundLookup =
  | { kind: 'ok'; data: PublicRound }
  | { kind: 'invalid' }
  | { kind: 'unavailable' };

export async function fetchPublicRound(code: string, opened: boolean): Promise<RoundLookup> {
  if (!INVITE_CODE.test(code)) return { kind: 'invalid' };
  const base = apiUrl();
  if (!base) {
    console.error('supporters-round: FRESHMAN_API_URL is not set');
    return { kind: 'unavailable' };
  }
  const query = new URLSearchParams({ code });
  if (opened) query.set('opened', '1');
  try {
    const response = await fetch(`${base}/supporters-round?${query}`, { cache: 'no-store' });
    if (response.status === 404 || response.status === 400) return { kind: 'invalid' };
    if (!response.ok) {
      console.error(`supporters-round: API answered ${response.status}`);
      return { kind: 'unavailable' };
    }
    return { kind: 'ok', data: (await response.json()) as PublicRound };
  } catch (error) {
    console.error('supporters-round: API unreachable', error);
    return { kind: 'unavailable' };
  }
}
