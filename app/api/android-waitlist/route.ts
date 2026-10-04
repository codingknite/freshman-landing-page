import { NextResponse, type NextRequest } from 'next/server';

/**
 * The Android waitlist form posts here, and this forwards to the Freshman
 * API, which stores the address. Going through this route keeps the API off
 * the browser's CORS list and its URL out of the page.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { email?: unknown; locale?: unknown } | null;
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const locale = typeof body?.locale === 'string' ? body.locale : undefined;
  if (!email || email.length > 320 || !EMAIL.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  const apiUrl = process.env.FRESHMAN_API_URL?.replace(/\/+$/, '');
  if (!apiUrl) {
    console.error('android-waitlist: FRESHMAN_API_URL is not set');
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }

  try {
    const response = await fetch(`${apiUrl}/waitlist/android`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, locale }),
      cache: 'no-store',
    });
    if (response.status === 400) return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    if (response.status === 429) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
    if (!response.ok) {
      console.error(`android-waitlist: API answered ${response.status}`);
      return NextResponse.json({ error: 'unavailable' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('android-waitlist: API unreachable', error);
    return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  }
}
