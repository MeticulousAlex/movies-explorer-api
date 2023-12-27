const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const msg = require('../constants/response-messages');
const envConsts = require('../constants/evironmentConstants');

const { JWT_SECRET = envConsts.secretKey } = process.env;

module.exports = (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(jwtToken, JWT_SECRET);
    if (!payload) {
      throw new UnauthorizedError(msg.unauthorized);
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new UnauthorizedError(msg.unauthorized));
    }
    next(err);
  }

  req.user = payload;

  next();
};
