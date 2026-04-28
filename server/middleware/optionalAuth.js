const jwt = require("jsonwebtoken");

module.exports = function optionalAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return next();
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch {
    // invalid token, just continue without user
  }

  next();
};