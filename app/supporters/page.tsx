import { InviteOnly, RoundUnavailable } from '@/components/supporters/invite-only';
import { SupportersRound } from '@/components/supporters/supporters-round';
import { fetchPublicRound } from '@/lib/supporters-round-server';

export const dynamic = 'force-dynamic';

/**
 * The Freshman Supporters Round. Only reachable with an invite code
 * (/supporters?code=AMARA-7Q4X); anything else gets the friendly
 * "by invitation" screen, with no hint of what is behind it.
 */
export default async function SupportersPage({ searchParams }: { searchParams: Promise<{ code?: string | string[] }> }) {
  const { code: raw } = await searchParams;
  const code = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? '';
  if (!code) return <InviteOnly />;

  const result = await fetchPublicRound(code, true);
  if (result.kind === 'invalid') return <InviteOnly />;
  if (result.kind === 'unavailable') return <RoundUnavailable />;
  return <SupportersRound code={code.toUpperCase()} initial={result.data} />;
}
