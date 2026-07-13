import { NextResponse } from 'next/server';

/**
 * Contact form — forwards to hello@sparkdigital.agency via FormSubmit.
 * Zero config: no API keys, no domain verification, no signup.
 * First submission triggers a one-click confirmation email to activate.
 */

const TO_EMAIL = 'hello@sparkdigital.agency';

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  revenue?: string;
  message?: string;
};

export async function POST(req: Request) {
  let data: ContactPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad JSON' }, { status: 400 });
  }

  if (!data?.email || !data?.message) {
    return NextResponse.json({ ok: false, error: 'Missing email or message' }, { status: 400 });
  }

  const body = new URLSearchParams({
    name:    data.name    || '',
    company: data.company || '',
    email:   data.email   || '',
    revenue: data.revenue || '',
    message: data.message || '',
    _subject: `New lead: ${data.name || data.company || data.email}`,
    _template: 'table',
    _captcha: 'false',
  });

  const res = await fetch(`https://formsubmit.co/ajax/${TO_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('[contact] FormSubmit error', res.status, errText);
    return NextResponse.json({ ok: false, error: errText }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
