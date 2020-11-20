const EMAIL_INVALID = {
  name: 'email',
  error: {
    message: 'Your email address is invalid. Please try again.'
  }
};

const EMAIL_IN_USE = {
  name: 'email',
  error: {
    message:
      'That email address is already in use. Please use a different email address.'
  }
};

const PASSWORD_INVALID = {
  name: 'password',
  error: {
    message: 'Your password is invalid. Please try again.'
  }
};

const USER_NOT_FOUND = 'User not found.';

const TOKEN_INVALID = 'Provided token is not valid.';

class CustomError extends Error {
  constructor(cause) {
    super('ValidationError');
    this.name = 'ValidationError';
    this.cause = cause;
  }
}

module.exports = {
  CustomError,
  EMAIL_INVALID,
  EMAIL_IN_USE,
  PASSWORD_INVALID,
  USER_NOT_FOUND,
  TOKEN_INVALID
};
