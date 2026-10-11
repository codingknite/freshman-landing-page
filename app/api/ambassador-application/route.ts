import { NextResponse, type NextRequest } from 'next/server';

/**
 * The ambassador application form posts here, and this forwards to the
 * Freshman API, which stores the application and emails the team. Same
 * reasons as the Android waitlist route: the API stays off the browser's CORS
 * list and its URL out of the page.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = text(body?.name);
  const email = text(body?.email);
  const school = text(body?.school);
  const website = text(body?.website);
  if (
    !name ||
    name.length > 120 ||
    !school ||
    school.length > 200 ||
    !email ||
    email.length > 320 ||
    !EMAIL.test(email)
  ) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const apiUrl = process.env.FRESHMAN_API_URL?.replace(/\/+$/, '');
  if (!apiUrl) {
    console.error('ambassador-application: FRESHMAN_API_URL is not set');
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }

  try {
    const response = await fetch(`${apiUrl}/ambassadors/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // The honeypot goes through as filled in; the API drops those quietly.
      body: JSON.stringify({ name, email, school, ...(website ? { website: website.slice(0, 200) } : {}) }),
      cache: 'no-store',
    });
    if (response.status === 400) return NextResponse.json({ error: 'invalid' }, { status: 400 });
    if (response.status === 429) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
    if (!response.ok) {
      console.error(`ambassador-application: API answered ${response.status}`);
      return NextResponse.json({ error: 'unavailable' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('ambassador-application: API unreachable', error);
    return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  }
}
