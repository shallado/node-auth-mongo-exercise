const express = require('express');
const user = require('../controllers/user');
const { authJwt } = require('../middlewares');

const router = express.Router();

const userRouter = (app) => {
  router.get(
    '/user', 
    [authJwt.verifyToken],
    user.userBoard
  )

  app.use('/api/test', router);
};

module.exports = userRouter;