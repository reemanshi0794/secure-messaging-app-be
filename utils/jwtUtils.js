const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

module.exports = { generateToken };
