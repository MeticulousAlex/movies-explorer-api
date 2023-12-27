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
    image: Joi.string().required().regex(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?(\S*.)/),
    trailerLink: Joi.string().required().regex(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?(\S*.)/),
    thumbnail: Joi.string().required().regex(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?(\S*.)/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.get('/', getAllMovies);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = router;
