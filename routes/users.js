const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMyInfo, modifyUser,
} = require('../controllers/users'); // подключить контроллеры

router.get('/me', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), getMyInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
  cookies: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), modifyUser);

module.exports = router;
