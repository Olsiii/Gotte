// Reads and writes the admin's site-text overrides in Upstash Redis, via
// its plain REST API (no npm dependency). Add the database from the Vercel
// dashboard → Storage → Upstash for Redis (free tier); connecting it to the
// project sets the env vars below automatically.
//
// Env vars (either naming works — Vercel's integration sets the KV_* ones):
//   KV_REST_API_URL   / UPSTASH_REDIS_REST_URL
//   KV_REST_API_TOKEN / UPSTASH_REDIS_REST_TOKEN
'use strict';

const DATA_KEY    = 'gotte:overrides';
const VERSION_KEY = 'gotte:overrides:version';
const EMPTY = { en: {}, sq: {} };

// Atomic compare-and-set: only write if nobody else saved since the
// admin loaded the form (stops two open tabs silently overwriting each other).
const SAVE_SCRIPT = `
local cur = tonumber(redis.call('GET', KEYS[2]) or '0')
if cur ~= tonumber(ARGV[1]) then return -1 end
redis.call('SET', KEYS[1], ARGV[2])
return redis.call('INCR', KEYS[2])
`;

function env() {
  const url   = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error('Storage is not connected — add Upstash for Redis in the Vercel dashboard (Storage tab)');
  }
  return { url, token };
}

async function redis(command) {
  const { url, token } = env();
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) {
    throw new Error(`Storage request failed: ${json.error || res.status}`);
  }
  return json.result;
}

function parse(raw) {
  try {
    const data = JSON.parse(raw);
    if (data && typeof data.en === 'object' && typeof data.sq === 'object') return data;
  } catch {}
  return EMPTY;
}

// Returns { version, data }; version is passed back on save.
async function readOverrides() {
  const [raw, version] = await Promise.all([
    redis(['GET', DATA_KEY]),
    redis(['GET', VERSION_KEY]),
  ]);
  return { version: Number(version) || 0, data: raw ? parse(raw) : EMPTY };
}

async function writeOverrides(data, version) {
  const result = await redis([
    'EVAL', SAVE_SCRIPT, '2', DATA_KEY, VERSION_KEY,
    String(Number(version) || 0), JSON.stringify(data),
  ]);
  if (result === -1) {
    const err = new Error('Content changed since you loaded it — reload and retry.');
    err.conflict = true;
    throw err;
  }
  return { version: result };
}

module.exports = { readOverrides, writeOverrides };
