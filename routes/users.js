const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMyInfo, modifyUser,
} = require('../controllers/users');

router.get('/me', getMyInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), modifyUser);

module.exports = router;
