const Movies = require('../models/movie');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrrorForbidden = require('../errors/ErrorForbidden');
const ErrrorNotFound = require('../errors/ErrorNotFound');
const { OK, CREATE } = require('../utils/constants');

module.exports.getUserMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};
module.exports.createCardMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(CREATE).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(' Переданы некорректные данные при создании карточки фильма.'));
      } else {
        next(err);
      }
    });
};
module.exports.removeCardMovie = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((card) => {
      if (!card) {
        throw new ErrrorNotFound('Карточка с указанным _id не найдена.');
      }
      if (String(card.owner) !== String(req.user._id)) {
        throw new ErrrorForbidden('Невозможно удалить чужую карточку');
      }
      return Movies.findByIdAndRemove(req.params.movieId);
    })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные карточки.'));
      } else {
        next(err);
      }
    });
};
