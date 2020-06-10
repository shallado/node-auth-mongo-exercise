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

  router.post('/signin', auth.signin);

  app.use('/api/auth', router);
}

module.exports = authRouter;