const jwt = require('jsonwebtoken');
const { userModel } = require('../models');
const { secretKey } = require('../config/auth');

const User = userModel;

// verifyToken
exports.verifyToken = (req, res, next) => {
  const bearerToken = req.get('Authorization');

  if (!bearerToken) {
    res.status(403).send({ message: 'No token provided' });
  }

  const token = bearerToken.replace('Bearer', '').trim();

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }

    next();
  });
};

// isAdmin
exports.isAdmin = (req, res, next) => {
  const bearerToken = req.get('Authorization');
  const token = bearerToken.replace('Bearer', '').trim();

  User.findOne({ accessToken: token }).populate('roles', '-_v').exec()
    .then((userData) => {
      const adminChecker = userData.roles.some((role) => role.name === 'admin');

      if (!adminChecker) {
        return res.status(401).send({ 
          message: 'Unauthorized access, require admin role' 
        });
      }

      next();
    })
    .catch((err) => res.status(500).send({ message: err }));
};

// isModerator
exports.isModerator = (req, res, next) => {
  const bearerToken = req.get('Authorization')
  const token = bearerToken.replace('Bearer', '').trim();

  User.findOne({ accessToken: token }).populate('roles', '-_v').exec()
    .then((userData) => {
      const moderatorChecker = userData.roles.some((role) => 
        role.name === 'moderator'
      );

      if (!moderatorChecker) {
        return res.status(401).send({ 
          message: 'Unauthorized access, require moderator role'
        });
      }
      
      next();
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};