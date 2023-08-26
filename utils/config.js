require('dotenv').config();

const PORT = process.env.PORT || 4000;
const BD_BITFILMS = process.env.BD_BITFILMS || 'mongodb://127.0.0.1:27017/bitfilmsdb';
module.exports = {
  PORT,
  BD_BITFILMS,
};
