const usersRouter = require('express').Router();
const {
  getUserMe,
  updatesUser,
} = require('../controllers/users');
const { validatorUpdatesUser } = require('../validate/validate');

usersRouter.get('/me', getUserMe);
usersRouter.patch('/me', validatorUpdatesUser, updatesUser);
module.exports = usersRouter;
