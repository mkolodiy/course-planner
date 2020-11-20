const {
  createNotFoundMessage,
  accessNotAllowed
} = require('./common/messages');
const jwt = require('./common/jwt');
const User = require('./api/users/users.model');
const { CustomError, TOKEN_INVALID } = require('./common/errors');

const notFound = (req, res, next) => {
  const error = new Error(createNotFoundMessage(req.originalUrl));
  res.status(404);
  return next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.json(err);
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
    next(new CustomError(TOKEN_INVALID));
  }
};

const hasAdminAccess = async (req, res, next) => {
  const { roles } = req.user;
  if (roles.includes(User.getRoles().ADMIN)) {
    return next();
  }

  res.status(403);
  next(new CustomError(accessNotAllowed));
};

module.exports = {
  notFound,
  errorHandler,
  authenticateToken,
  hasAdminAccess
};
