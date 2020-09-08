const { getNotFoundMessage } = require('./common/messages');

function notFound(req, res, next) {
  const error = new Error(getNotFoundMessage(req.originalUrl));
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  res.json({
    message: error.message
  });
}

module.exports = {
  notFound,
  errorHandler
};
