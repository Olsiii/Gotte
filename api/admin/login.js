'use strict';

const { createSessionCookie, readJsonBody, timingSafeEqualStr } = require('../_lib/auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    // Fail closed — an unset password must never mean "anyone can log in".
    return res.status(500).json({ error: 'Admin login is not configured' });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (!password || !timingSafeEqualStr(password, adminPassword)) {
    // Same message either way — don't reveal whether the password field
    // was empty vs. simply wrong.
    return res.status(401).json({ error: 'Incorrect password' });
  }

  res.setHeader('Set-Cookie', createSessionCookie());
  return res.status(200).json({ ok: true });
};
