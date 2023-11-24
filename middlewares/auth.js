const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(jwtToken, JWT_SECRET);
    if (!payload) {
      throw new UnauthorizedError('Необходима авторизация');
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Необходима авторизация'));
    }
    next(new UnauthorizedError('Произошла ошибка'));
  }

  req.user = payload;

  next();
};
