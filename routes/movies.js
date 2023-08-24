const moviesRouter = require('express').Router();
const { getUserMovies, createCardMovie, removeCardMovie } = require('../controllers/movies');
const { validateCreateCardMovie, validatorRemoveMovie } = require('../validate/validate');

moviesRouter.get('/', getUserMovies);
moviesRouter.post('/', validateCreateCardMovie, createCardMovie);
moviesRouter.delete('/:movieId', validatorRemoveMovie, removeCardMovie);

module.exports = moviesRouter;
