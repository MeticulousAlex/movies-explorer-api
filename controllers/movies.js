const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const msg = require('../constants/response-messages');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.message === 'wrongUrl') {
        return next(new BadRequestError(msg.badRequest));
      }

      return next(err);
    })
    .catch(next);
};

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      const sortedMovies = movies.filter((movie) => movie.owner.toString() === req.user._id);
      res.send({ data: sortedMovies });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params._id }).orFail(new Error(msg.notFound))
    .then((foundMovie) => {
      if (foundMovie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(msg.forbidden);
      }
      Movie.deleteOne(foundMovie)
        .then((movie) => res.send({ deletedMovie: movie }))
        .catch(next);
    })
    .catch((err) => {
      if (err.message === msg.notFound) {
        return next(new NotFoundError(err.message));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(msg.badRequest));
      }
      return next(err);
    });
};
