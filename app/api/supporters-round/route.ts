import { NextResponse, type NextRequest } from 'next/server';
import { fetchPublicRound } from '@/lib/supporters-round-server';

/**
 * The supporters round page's live tracker polls here. Answers only for a
 * live invite code; the API masks every name before it gets this far.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code') ?? '';
  const result = await fetchPublicRound(code, false);
  if (result.kind === 'invalid') return NextResponse.json({ message: 'round.invite_invalid' }, { status: 404 });
  if (result.kind === 'unavailable') return NextResponse.json({ message: 'unavailable' }, { status: 502 });
  return NextResponse.json(result.data, { headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
}
