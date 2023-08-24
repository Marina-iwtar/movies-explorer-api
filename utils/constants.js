const OK = 200;
const CREATE = 201;
const JWT_SECRET_DEV = 'dev-secret';
const regexLink = /(?:https?):\/\/(w{3}\.)?\w+([.|-]{1}\w+)*\.[0-9a-zA-Z-]+(\/[\w\-.~:/?#[\]@!$&'()*+,;=]*#?)?/;
module.exports = {
  OK,
  CREATE,
  regexLink,
  JWT_SECRET_DEV,
};
