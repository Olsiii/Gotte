// Shared session helpers for the admin API routes.
//
// A single shared password (ADMIN_PASSWORD) gates access — there are no
// per-user accounts, which matches a one-owner business site. A successful
// login gets a signed, expiring cookie; every admin route re-verifies that
// signature on each request rather than trusting the cookie's contents.
//
// Required env vars (set in the Vercel project's dashboard, never in code):
//   ADMIN_PASSWORD        — the password the admin page's login form checks.
//   ADMIN_SESSION_SECRET  — a long random string used to sign session
//                           cookies. Generate one with `openssl rand -hex 32`.
'use strict';

const crypto = require('crypto');

const COOKIE_NAME = 'gotte_admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(payload) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set');
  const body = base64url(JSON.stringify(payload));
  const mac = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${mac}`;
}

function verify(token) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, mac] = parts;
  const expectedMac = crypto.createHmac('sha256', secret).update(body).digest('base64url');

  const macBuf = Buffer.from(mac);
  const expectedBuf = Buffer.from(expectedMac);
  if (macBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(macBuf, expectedBuf)) {
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (!payload || typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
  return payload;
}

function parseCookies(req) {
  const header = req.headers?.cookie;
  const out = {};
  if (!header) return out;
  header.split(';').forEach(part => {
    const idx = part.indexOf('=');
    if (idx === -1) return;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  });
  return out;
}

function createSessionCookie() {
  const token = sign({ exp: Date.now() + SESSION_TTL_MS });
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

// Checks the request's session cookie. Returns true/false — callers should
// respond 401 on false rather than throwing, so a bad/expired cookie just
// looks like "not logged in" to the client.
function isAuthenticated(req) {
  const cookies = parseCookies(req);
  return !!verify(cookies[COOKIE_NAME]);
}

// Reads and JSON-parses the request body. Written against raw Node
// req/res (not Vercel's higher-level helpers) so it behaves the same
// across Vercel Node runtime versions.
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      if (data.length > 1e7) { // 10MB guard against abuse
        reject(new Error('Body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function timingSafeEqualStr(a, b) {
  const aBuf = Buffer.from(String(a));
  const bBuf = Buffer.from(String(b));
  if (aBuf.length !== bBuf.length) {
    // Still run a comparison of equal length to avoid an obvious
    // early-exit timing signal on length mismatches.
    crypto.timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return crypto.timingSafeEqual(aBuf, bBuf);
}

module.exports = {
  COOKIE_NAME,
  createSessionCookie,
  clearSessionCookie,
  isAuthenticated,
  readJsonBody,
  timingSafeEqualStr,
};
