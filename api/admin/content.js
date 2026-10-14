'use strict';

const { isAuthenticated, readJsonBody } = require('../_lib/auth');
const { readOverrides, writeOverrides } = require('../_lib/github');

module.exports = async (req, res) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  if (req.method === 'GET') {
    try {
      const { sha, data } = await readOverrides();
      return res.status(200).json({ sha, data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    let body;
    try {
      body = await readJsonBody(req);
    } catch {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const data = body.data;
    if (!data || typeof data !== 'object' || typeof data.en !== 'object' || typeof data.sq !== 'object') {
      return res.status(400).json({ error: 'Expected { data: { en: {...}, sq: {...} } }' });
    }

    try {
      const { sha } = await writeOverrides(data, body.sha || null);
      return res.status(200).json({ ok: true, sha });
    } catch (err) {
      return res.status(err.conflict ? 409 : 500).json({ error: err.message });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
};
