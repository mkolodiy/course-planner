const { createNotFoundMessage, invalidToken } = require('./common/messages');
const jwt = require('./common/jwt');

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

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = await jwt.verify(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(403);
    next(new Error(invalidToken));
  }
};

module.exports = {
  notFound,
  errorHandler,
  authenticateToken
};
