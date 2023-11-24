const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie, getAllMovies, deleteMovie,
} = require('../controllers/movies');

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
    trailerLink: Joi.string().required().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
    thumbnail: Joi.string().required().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
  cookies: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), createMovie);

router.get('/', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), getAllMovies);

router.delete('/:_id', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string(),
  }),
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), deleteMovie);

module.exports = router;
