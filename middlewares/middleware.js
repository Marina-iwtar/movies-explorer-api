const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

const middleware = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({ message: statusCode === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message });
  return next();
};

module.exports = middleware;
