const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrrorConflict = require('../errors/ErrorConflict');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const { OK, CREATE } = require('../utils/constants');
const { JWT_SECRET_DEV } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new ErrorNotFound('Пользователь с указанным _id не найден.'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new ErrorBadRequest(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      }
      return next(err);
    });
};

module.exports.updatesUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((users) => res.status(OK).send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ErrorBadRequest(
            'Переданы некорректные данные при обновлении пользователя.',
          ),
        );
      } else if (err.code === 11000) {
        next(new ErrrorConflict(`Пользователь с таким ${email} уже зарегистирован`));
      } else {
        next(err);
      }
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, {
        expiresIn: '7d',
      });
      res.status(OK).send({ token, email: user.email });
    })
    .catch(next);
};
module.exports.createUsers = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.status(CREATE).send({
        email,
        name,
        _id,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ErrrorConflict(`Пользователь с таким ${email} уже зарегистирован`),
        );
      } else if (err.name === 'ValidationError') {
        next(
          new ErrorBadRequest(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
};
