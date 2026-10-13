import { NextResponse, type NextRequest } from 'next/server';
import { callApi } from '@/lib/ambassador-session';

/**
 * Step one of the ambassador sign-in. The API only sends a code to an email in
 * the program, and answers the same either way, so this page can't be used to
 * find out who is an ambassador.
 */
export async function POST(request: NextRequest) {
  const { email } = (await request.json().catch(() => ({}))) as { email?: string };
  if (!email?.trim()) return NextResponse.json({ message: 'Enter your email.' }, { status: 400 });

  const reply = await callApi('/auth/ambassador/signin', { method: 'POST', body: { email: email.trim() } }).catch(() => null);
  if (reply?.status === 429) {
    return NextResponse.json({ message: 'Too many tries. Wait a minute and try again.' }, { status: 429 });
  }
  if (reply?.status !== 200) {
    return NextResponse.json({ message: "Couldn't send a code. Try again in a moment." }, { status: 502 });
  }
  return NextResponse.json({ sent: true });
}
