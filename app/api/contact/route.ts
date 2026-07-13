import { NextResponse } from 'next/server';

/**
 * Contact form handler, delivers leads via Resend (https://resend.com).
 *
 * Setup, 3 steps:
 *   1. resend.com, create free account, verify your sending domain
 *   2. Create an API key
 *   3. Add to .env.local:
 *        RESEND_API_KEY=re_xxxxxxxxxxxx
 *        CONTACT_TO_EMAIL=hello@sparkdigital.agency
 *        CONTACT_FROM_EMAIL=leads@sparkdigital.agency
 *
 * Free tier: 3,000 emails/month, plenty for a lead form.
 * If RESEND_API_KEY is missing the handler still returns 200 so local dev works,
 * and it logs the submission so you can see what would have been sent.
 */

const RESEND_API_KEY   = process.env.RESEND_API_KEY;
const TO_EMAIL         = process.env.CONTACT_TO_EMAIL   || 'hello@sparkdigital.agency';
// Resend requires the FROM domain to be verified. Falls back to onboarding@resend.dev,
// which every Resend account can send from without any DNS setup.
const FROM_EMAIL       = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  revenue?: string;
  message?: string;
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!
  ));
}

function renderEmail(d: ContactPayload) {
  const rows: [string, string][] = [
    ['Name',    d.name    || ''],
    ['Company', d.company || ''],
    ['Email',   d.email   || ''],
    ['Revenue', d.revenue || ''],
    ['Message', d.message || ''],
  ];
  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; color:#1a1a1a; max-width:560px;">
      <h2 style="margin:0 0 16px; font-size:18px;">New lead from sparkdigital.agency</h2>
      <table style="width:100%; border-collapse:collapse;">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:8px 12px; background:#f6f6f6; font-weight:600; width:120px; vertical-align:top;">${k}</td>
            <td style="padding:8px 12px; background:#fff; white-space:pre-wrap;">${escapeHtml(v)}</td>
          </tr>`).join('')}
      </table>
      <p style="margin-top:20px; font-size:12px; color:#666;">Reply directly to this email to respond.</p>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  return { html, text };
}

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

  const { html, text } = renderEmail(data);
  const subject = `New lead: ${data.name || data.company || data.email}`;

  if (!RESEND_API_KEY) {
    console.log('[contact] RESEND_API_KEY not set. Would send:', { subject, data });
    return NextResponse.json({ ok: true, dev: true });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Spark website <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      reply_to: data.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('[contact] Resend error', res.status, errText);
    return NextResponse.json({ ok: false, error: errText }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
