const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/auth');

// verifyToken
exports.verifyToken = (req, res, next) => {
  const bearerToken = req.get('Authorization');

  if (!bearerToken) {
    res.status(403).send({ message: 'No token provided' });
  }

  const token = bearerToken.replace('Bearer', '').trim();

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Unauthorized access' });
    }

    next();
  });
};

// isAdmin

// isModerator