import { NextResponse, type NextRequest } from 'next/server';
import { callApi, setSessionCookies, type ApiSession } from '@/lib/ambassador-session';

/** Step two: exchange the code for a session, kept only if `/ambassador/me` agrees. */
export async function POST(request: NextRequest) {
  const { email, code } = (await request.json().catch(() => ({}))) as { email?: string; code?: string };
  if (!email?.trim() || !code?.trim()) {
    return NextResponse.json({ message: 'Enter the code from your email.' }, { status: 400 });
  }

  const verified = await callApi('/auth/ambassador/verify', {
    method: 'POST',
    body: { email: email.trim(), token: code.trim() },
  }).catch(() => null);
  if (!verified) {
    return NextResponse.json({ message: "Couldn't sign you in. Try again in a moment." }, { status: 502 });
  }
  if (verified.status === 403) {
    return NextResponse.json({ message: "This email isn't in the ambassador program." }, { status: 403 });
  }
  const session = (verified.body as { session?: ApiSession } | null)?.session;
  if (verified.status !== 200 || !session?.access_token) {
    return NextResponse.json({ message: 'That code is invalid or has expired.' }, { status: 401 });
  }

  const me = await callApi('/ambassador/me', { accessToken: session.access_token });
  if (me.status !== 200) {
    return NextResponse.json({ message: "This email isn't in the ambassador program." }, { status: 403 });
  }

  const response = NextResponse.json({ signedIn: true });
  setSessionCookies(response, session);
  return response;
}
