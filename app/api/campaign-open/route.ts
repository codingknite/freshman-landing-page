import { NextResponse, type NextRequest } from 'next/server';

/**
 * The landing page reports an open from a tracked email link here, and this
 * forwards to the Freshman API, which counts it for the dashboard. Going
 * through this route keeps the API off the browser's CORS list.
 */

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { source?: unknown } | null;
  if (body?.source !== 'reactivation') {
    return NextResponse.json({ error: 'invalid_source' }, { status: 400 });
  }

  const apiUrl = process.env.FRESHMAN_API_URL?.replace(/\/+$/, '');
  if (!apiUrl) {
    console.error('campaign-open: FRESHMAN_API_URL is not set');
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }

  try {
    const response = await fetch(`${apiUrl}/campaign-opens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: body.source }),
      cache: 'no-store',
    });
    if (!response.ok) {
      console.error(`campaign-open: API answered ${response.status}`);
      return NextResponse.json({ error: 'unavailable' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('campaign-open: API unreachable', error);
    return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  }
}
