const { createNotFoundMessage } = require('./common/messages');

const notFound = (req, res, next) => {
  const error = new Error(createNotFoundMessage(req.originalUrl));
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.json({
    message: err.message
  });
};

module.exports = {
  notFound,
  errorHandler
};
