const express = require('express');
const user = require('../controllers/user');
const { authJwt } = require('../middlewares');

const router = express.Router();

const userRouter = (app) => {
  router.get(
    '/user', 
    [authJwt.verifyToken],
    user.userBoard
  );

  router.get(
    '/admin', 
    [
      authJwt.verifyToken, 
      authJwt.isAdmin
    ],
    user.adminBoard
)

  app.use('/api/test', router);
};

module.exports = userRouter;