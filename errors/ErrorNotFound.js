const { NOT_FOUND } = require('../utils/constants');

module.exports = class ErrrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
};
