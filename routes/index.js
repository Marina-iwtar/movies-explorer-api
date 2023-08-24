const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const ErrorNotFound = require('../errors/ErrorNotFound');
const auth = require('../middlewares/auth');
const { createUsers, login } = require('../controllers/users');
const { validateUpdatesUser, validateLogin } = require('../validate/validate');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUpdatesUser, createUsers);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});
module.exports = router;
