// Reads and writes content/overrides.json by committing straight to the
// site's own GitHub repo via the Contents API. Vercel is already connected
// to this repo and redeploys on every push, so a save here becomes a commit
// and a new deploy — no database, no extra storage service to provision.
//
// Required env vars:
//   GITHUB_TOKEN   — a GitHub personal access token with "contents: write"
//                    permission on this repo (fine-grained PAT scoped to
//                    just this repo, or a classic PAT with the `repo` scope).
//   GITHUB_REPO    — "owner/repo", e.g. "olsisopi1/gotte".
//   GITHUB_BRANCH  — defaults to "main" if unset.
'use strict';

const FILE_PATH = 'content/overrides.json';
const API_BASE = 'https://api.github.com';

function env() {
  const token  = process.env.GITHUB_TOKEN;
  const repo   = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!token || !repo) {
    throw new Error('GITHUB_TOKEN and GITHUB_REPO must be set');
  }
  return { token, repo, branch };
}

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'gotte-admin-cms',
  };
}

// Returns { sha, data } — sha is needed to save (optimistic concurrency:
// GitHub rejects a write whose sha doesn't match the file's current state).
async function readOverrides() {
  const { token, repo, branch } = env();
  const url = `${API_BASE}/repos/${repo}/contents/${FILE_PATH}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: headers(token) });

  if (res.status === 404) {
    // File doesn't exist yet on this branch — treat as empty overrides.
    return { sha: null, data: { en: {}, sq: {} } };
  }
  if (!res.ok) {
    throw new Error(`GitHub read failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  const raw = Buffer.from(json.content, 'base64').toString('utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    data = { en: {}, sq: {} };
  }
  return { sha: json.sha, data };
}

// Commits new content. If `sha` is stale (someone else saved in between),
// GitHub returns 409 and we surface that as a conflict rather than
// silently overwriting their change.
async function writeOverrides(data, sha) {
  const { token, repo, branch } = env();
  const url = `${API_BASE}/repos/${repo}/contents/${FILE_PATH}`;
  const body = {
    message: 'Update site content via admin panel',
    content: Buffer.from(JSON.stringify(data, null, 2) + '\n', 'utf8').toString('base64'),
    branch,
    committer: { name: 'Gotte Admin', email: 'admin@gotte.eco' },
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.status === 409) {
    const err = new Error('Content changed since you loaded it — reload and retry.');
    err.conflict = true;
    throw err;
  }
  if (!res.ok) {
    throw new Error(`GitHub write failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return { sha: json.content.sha };
}

module.exports = { readOverrides, writeOverrides };
