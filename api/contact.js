// Contact / quote form handler. Receives the form as multipart/form-data
// and emails it (with the optional logo/artwork attached) via Resend.
//
// Required env vars (Vercel dashboard → Settings → Environment Variables):
//   RESEND_API_KEY  — from resend.com → API Keys.
//   CONTACT_TO      — inbox that receives submissions, e.g. "info@gotte.eco".
// Optional:
//   CONTACT_FROM    — sender, e.g. "GOTTË <quotes@gotte.eco>". Must be on a
//                     domain verified in Resend. Defaults to Resend's test
//                     sender, which can only deliver to the email address
//                     your Resend account was created with.
'use strict';

// Vercel rejects request bodies over ~4.5MB before this code even runs,
// so the file itself has to stay a bit under that. Keep in step with
// MAX_FILE_BYTES in js/main.js.
const MAX_BODY_BYTES = 4.5 * 1024 * 1024;
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXT = new Set(['png', 'jpg', 'jpeg', 'pdf', 'ai', 'eps', 'svg']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Body too large'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function field(form, name, maxLen) {
  const v = form.get(name);
  return typeof v === 'string' ? v.trim().slice(0, maxLen) : '';
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to     = process.env.CONTACT_TO;
  const from   = process.env.CONTACT_FROM || 'gotte.eco <onboarding@resend.dev>';
  if (!apiKey || !to) {
    return res.status(500).json({ error: 'Contact form is not configured' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.startsWith('multipart/form-data')) {
    return res.status(415).json({ error: 'Expected multipart/form-data' });
  }

  // Parse with the platform's own multipart parser (Node 18+), so this
  // function stays dependency-free like the admin ones.
  let form;
  try {
    const raw = await readRawBody(req);
    form = await new Response(raw, { headers: { 'content-type': contentType } }).formData();
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.status === 413 ? 'File too large' : 'Invalid form data' });
  }

  // Honeypot filled → bot. Pretend it worked, send nothing.
  if (field(form, '_gotcha', 200)) return res.status(200).json({ ok: true });

  const name     = field(form, 'name', 200);
  const email    = field(form, 'email', 200);
  const message  = field(form, 'message', 5000);
  const product  = field(form, 'product', 200);
  const quantity = field(form, 'quantity', 100);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  const attachments = [];
  const file = form.get('attachment');
  if (file && typeof file === 'object' && file.size > 0) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (!ALLOWED_EXT.has(ext)) return res.status(400).json({ error: 'File type not allowed' });
    if (file.size > MAX_FILE_BYTES) return res.status(413).json({ error: 'File too large' });
    attachments.push({
      filename: file.name.replace(/[^\w.\- ]+/g, '_').slice(0, 120),
      content: Buffer.from(await file.arrayBuffer()).toString('base64'),
    });
  }

  const isQuote = !!(product || quantity);
  const lines = [
    `Name:     ${name}`,
    `Email:    ${email}`,
    product  ? `Product:  ${product}` : null,
    quantity ? `Quantity: ${quantity}` : null,
    attachments.length ? `File:     ${attachments[0].filename} (attached)` : null,
    '',
    message,
  ].filter(l => l !== null);

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map(s => s.trim()).filter(Boolean),
        reply_to: email,
        subject: `${isQuote ? 'New quote request' : 'New message'} from ${name} — gotte.eco`,
        text: lines.join('\n'),
        attachments,
      }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text().catch(() => ''));
      return res.status(502).json({ error: 'Could not send message' });
    }
  } catch (err) {
    console.error('Resend request failed', err);
    return res.status(502).json({ error: 'Could not send message' });
  }

  return res.status(200).json({ ok: true });
};
