'use strict';

const { isAuthenticated } = require('../_lib/auth');

// Lets the admin page check login state on load without exposing anything
// sensitive — just true/false.
module.exports = async (req, res) => {
  return res.status(200).json({ authenticated: isAuthenticated(req) });
};
