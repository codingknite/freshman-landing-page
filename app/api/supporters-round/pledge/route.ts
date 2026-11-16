import { NextResponse, type NextRequest } from 'next/server';
import { apiUrl } from '@/lib/supporters-round-server';

/**
 * The pledge form posts here, and this forwards to the Freshman API, which
 * checks the invite code, the amount and the shares left. No money moves:
 * the team follows up by email with the agreement and payment details.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== 'object') return NextResponse.json({ message: 'invalid' }, { status: 400 });

  const base = apiUrl();
  if (!base) {
    console.error('supporters-round: FRESHMAN_API_URL is not set');
    return NextResponse.json({ message: 'unavailable' }, { status: 503 });
  }

  const visitorIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? '';
  try {
    const response = await fetch(`${base}/supporters-round/pledges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Hashed by the API, only to spot repeat submissions.
        ...(visitorIp ? { 'x-visitor-ip': visitorIp } : {}),
        'x-visitor-user-agent': request.headers.get('user-agent')?.slice(0, 300) ?? '',
      },
      body: JSON.stringify({
        code: body.code,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone || null,
        country: body.country,
        amount: body.amount,
        hideAmount: body.hideAmount === true,
        wantsUpdates: body.wantsUpdates !== false,
        riskAck: body.riskAck,
      }),
      cache: 'no-store',
    });
    const reply = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    if (response.status === 429) return NextResponse.json({ message: 'rate_limited' }, { status: 429 });
    return NextResponse.json(reply, { status: response.status });
  } catch (error) {
    console.error('supporters-round: API unreachable', error);
    return NextResponse.json({ message: 'unavailable' }, { status: 502 });
  }
}
