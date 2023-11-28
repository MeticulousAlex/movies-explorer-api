const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const DuplicateError = require('../errors/DuplicateError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const msg = require('../constants/response-messages');
const envConsts = require('../constants/evironmentConstants');

const { JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((password) => User.create({
      name, email, password,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(201).send({ user: userData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(msg.badRequest));
      }
      if (err.name === 'MongoServerError') {
        return next(new DuplicateError(msg.duplicate));
      }

      return next(err);
    });
};

module.exports.getMyInfo = (req, res, next) => {
  User.findOne({ _id: req.user._id }).orFail(new NotFoundError(msg.notFound))
    .then((user) => {
      res.send({ userData: user });
    })
    .catch((err) => {
      if (err.message === msg.notFound) {
        return next(new NotFoundError(err.message));
      }

      return next(err);
    });
};

module.exports.modifyUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  }).orFail(new Error(msg.notFound))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === msg.notFound) {
        return next(new NotFoundError(err.message));
      }
      if (err.name === 'ValidationError' || err.message === 'wrongUrl') {
        return next(new BadRequestError(msg.badRequest));
      }
      if (err.message.includes('E11000 duplicate key error')) {
        return next(new DuplicateError(msg.duplicate));
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : envConsts.secretKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: false,
        sameSite: 'None',
      }).send({ user: userData });
    })
    .catch((err) => {
      if (err.message === msg.unauthorized) {
        return next(new UnauthorizedError(err.message));
      }

      return next(err);
    });
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', 'insufficient', {
    maxAge: 0,
    httpOnly: true,
    secure: false,
    sameSite: 'None',
  }).send({ message: msg.cookieDeleted });
};
