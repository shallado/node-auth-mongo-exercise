const express = require('express');
const auth = require('../controllers/auth');
const { verifySignUp } = require('../middlewares');

const router = express.Router();

const authRouter = (app) => {
  router.post(
    '/signup', 
    [
      verifySignUp.checkDuplicateEmailAndUsername,
      verifySignUp.checkRolesExist
    ], 
    auth.signup
  );

  app.use('/api/auth', router);
}

module.exports = authRouter;