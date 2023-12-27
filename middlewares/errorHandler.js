const msg = require('../constants/response-messages');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? msg.serverError : message });
  next();
};
