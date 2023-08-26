const mongoose = require('mongoose');
const { regexLink } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {

  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLink.test(v),
      message: 'Некорректный url',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLink.test(v),
      message: 'Некорректный url',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLink.test(v),
      message: 'Некорректный url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('movie', movieSchema);
