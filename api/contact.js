/**
 * POST /api/contact
 * Vercel Serverless Function (Node runtime).
 *
 * Pipeline:
 *   1. Method check
 *   2. Rate limit (Upstash Redis, resilient with explicit outage policy)
 *   3. Parse & strictly validate JSON body
 *   4. Honeypot check (silent 200 OK if filled)
 *   5. Input normalization & server-side length/type bounds
 *   6. Required-field & format validation
 *   7. Dispatch email via Resend (HTML entity-escaped once in template)
 *   8. Await Telegram alert safely (HTML formatted, error-contained)
 */

import { Resend } from 'resend';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// ---------- Rate limiter (3 submissions per IP per 15 min — SECURITY.md §4) ----------
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '15 m'),
      analytics: false,
      prefix: 'moiz:contact',
    })
  : null;

// ---------- Normalization Helpers ----------
// Keep in-memory text clean (no HTML entities), but strip newlines from single-line fields
const cleanSingleLine = (v) =>
  typeof v === 'string'
    ? v.replace(/[\r\n]+/g, ' ').trim()
    : '';

const cleanMultiLine = (v) =>
  typeof v === 'string'
    ? v.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
    : '';

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getClientIp = (req) => {
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) return realIp.trim();
  const vercelFwd = req.headers['x-vercel-forwarded-for'];
  if (typeof vercelFwd === 'string' && vercelFwd.trim()) return vercelFwd.split(',')[0].trim();
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.trim()) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress ?? 'unknown';
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED = ['name', 'email', 'website_type', 'description'];

// ---------- Main handler ----------
export default async function handler(req, res) {
  // 1. Method check
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Rate limit (Upstash) — preserves resource protection before heavy operations
  if (ratelimit) {
    try {
      const ip = getClientIp(req);
      const { success, remaining, reset } = await ratelimit.limit(ip);
      res.setHeader('X-RateLimit-Remaining', String(remaining));
      if (!success) {
        res.setHeader('Retry-After', String(Math.ceil((reset - Date.now()) / 1000)));
        return res.status(429).json({
          error: 'Too many submissions. Please wait a few minutes or message via WhatsApp.',
        });
      }
    } catch (limiterErr) {
      // Outage policy: log warning and proceed unthrottled with telemetry header to preserve lead capture
      res.setHeader('X-RateLimit-Status', 'degraded');
      console.warn('[contact] Rate limiter unavailable, proceeding degraded:', limiterErr?.message);
    }
  }

  // 3. Parse and strictly validate body structure
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // 4. Honeypot — if filled, pretend success (silent drop)
  if (body.website_hp_field) {
    return res.status(200).json({ ok: true });
  }

  // 5. Normalize inputs without HTML entity-encoding
  const payload = {
    name: cleanSingleLine(body.name),
    business_name: cleanSingleLine(body.business_name),
    email: cleanSingleLine(body.email).toLowerCase(),
    preferred_contact: body.preferred_contact === 'whatsapp' ? 'whatsapp' : 'email',
    website_type: cleanSingleLine(body.website_type),
    description: cleanMultiLine(body.description),
    budget_range: cleanSingleLine(body.budget_range),
    desired_timeline: cleanSingleLine(body.desired_timeline),
    submittedAt: new Date().toISOString(),
  };

  // 6. Validation (required fields, lengths, email format)
  const errors = {};
  for (const field of REQUIRED) {
    if (!payload[field]) errors[field] = 'Required';
  }

  if (payload.name && payload.name.length > 100) {
    errors.name = 'Name too long (max 100 chars)';
  }
  if (payload.business_name && payload.business_name.length > 100) {
    errors.business_name = 'Business name too long (max 100 chars)';
  }
  if (payload.email) {
    if (payload.email.length > 254) {
      errors.email = 'Email too long (max 254 chars)';
    } else if (!EMAIL_RE.test(payload.email)) {
      errors.email = 'Invalid email address';
    }
  }
  if (payload.website_type && payload.website_type.length > 100) {
    errors.website_type = 'Website type too long (max 100 chars)';
  }
  if (payload.budget_range && payload.budget_range.length > 50) {
    errors.budget_range = 'Budget range too long (max 50 chars)';
  }
  if (payload.desired_timeline && payload.desired_timeline.length > 50) {
    errors.desired_timeline = 'Desired timeline too long (max 50 chars)';
  }
  if (payload.description) {
    if (payload.description.length < 20) {
      errors.description = 'Description too short (min 20 chars)';
    } else if (payload.description.length > 5000) {
      errors.description = 'Description too long (max 5000 chars)';
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ error: 'Validation failed', fields: errors });
  }

  // 7. Resend dispatch
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!resendKey || !toEmail) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars');
    return res.status(500).json({ error: 'Server is not configured to send email.' });
  }

  const resend = new Resend(resendKey);

  try {
    const { error } = await resend.emails.send({
      from: `MOIZ.UX Enquiries <${fromEmail}>`,
      to: [toEmail],
      reply_to: payload.email,
      subject: `New enquiry: ${payload.name} — ${payload.website_type}`,
      html: buildEmailHtml(payload),
      text: buildEmailText(payload),
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return res.status(502).json({ error: 'Email dispatch failed. Please try WhatsApp instead.' });
    }
  } catch (err) {
    console.error('[contact] Resend threw:', err);
    return res.status(502).json({ error: 'Email dispatch failed. Please try WhatsApp instead.' });
  }

  // 8. Optional Telegram alert — awaited safely within try/catch so lifecycle finishes cleanly
  try {
    await notifyTelegram(payload);
  } catch (e) {
    console.warn('[contact] Telegram notify failed:', e?.message);
  }

  return res.status(200).json({ ok: true });
}

// ---------- Email templates ----------
function buildEmailHtml(p) {
  const row = (label, value) =>
    value
      ? `<tr><td style="padding:6px 12px;color:#94A3B8;font-size:13px;vertical-align:top;">${label}</td><td style="padding:6px 12px;color:#F8FAFC;font-size:14px;">${escapeHtml(value)}</td></tr>`
      : '';
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;background:#0B0F17;padding:24px;color:#F8FAFC;">
      <h2 style="color:#00F0FF;margin:0 0 16px;">New project enquiry</h2>
      <table style="border-collapse:collapse;background:#111827;border:1px solid #1E293B;border-radius:8px;width:100%;">
        ${row('Name', p.name)}
        ${row('Business', p.business_name)}
        ${row('Email', p.email)}
        ${row('Preferred contact', p.preferred_contact)}
        ${row('Website type', p.website_type)}
        ${row('Budget', p.budget_range)}
        ${row('Timeline', p.desired_timeline)}
        ${row('Submitted', p.submittedAt)}
      </table>
      <h3 style="color:#F8FAFC;margin:24px 0 8px;font-size:14px;">Description</h3>
      <p style="background:#111827;border:1px solid #1E293B;border-radius:8px;padding:12px;color:#F8FAFC;white-space:pre-wrap;font-size:14px;">${escapeHtml(p.description)}</p>
    </div>`;
}

function buildEmailText(p) {
  return [
    'New project enquiry',
    '',
    `Name: ${p.name}`,
    `Business: ${p.business_name || '—'}`,
    `Email: ${p.email}`,
    `Preferred contact: ${p.preferred_contact}`,
    `Website type: ${p.website_type}`,
    `Budget: ${p.budget_range || '—'}`,
    `Timeline: ${p.desired_timeline || '—'}`,
    `Submitted: ${p.submittedAt}`,
    '',
    'Description:',
    p.description,
  ].join('\n');
}

// ---------- Telegram (optional) ----------
async function notifyTelegram(p) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const escapeTgHtml = (s) =>
    String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const text = [
    '<b>New enquiry — MOIZ.UX</b>',
    `<b>Name:</b> ${escapeTgHtml(p.name)}`,
    p.business_name ? `<b>Business:</b> ${escapeTgHtml(p.business_name)}` : '',
    `<b>Email:</b> ${escapeTgHtml(p.email)}`,
    `<b>Type:</b> ${escapeTgHtml(p.website_type)}`,
    p.budget_range ? `<b>Budget:</b> ${escapeTgHtml(p.budget_range)}` : '',
    p.desired_timeline ? `<b>Timeline:</b> ${escapeTgHtml(p.desired_timeline)}` : '',
    '',
    escapeTgHtml(p.description.slice(0, 800)),
  ]
    .filter(Boolean)
    .join('\n');

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!tgRes.ok) {
    const errData = await tgRes.json().catch(() => ({}));
    console.warn('[contact] Telegram API responded with error:', tgRes.status, errData?.description || 'Request failed');
    return;
  }

  const data = await tgRes.json().catch(() => ({}));
  if (!data.ok) {
    console.warn('[contact] Telegram notification not OK:', data?.description);
  }
}