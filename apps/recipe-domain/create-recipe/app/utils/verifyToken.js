const jwt = require('jsonwebtoken');

function verifyToken(token) {
  try {
    return jwt.verify(token, 'your_jwt_secret_key');
  } catch (err) {
    return null;
  }
}

module.exports = { verifyToken };
