'use strict';

const { readOverrides } = require('./_lib/store');

// Public, read-only: the live site fetches the admin's text overrides from
// here at boot. Briefly CDN-cached so a save shows up within ~10 seconds
// without every page view hitting the database.
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { data } = await readOverrides();
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=60');
    return res.status(200).json(data);
  } catch {
    // Not configured / storage down — the site just keeps its defaults.
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ en: {}, sq: {} });
  }
};
