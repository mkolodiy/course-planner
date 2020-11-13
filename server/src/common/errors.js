const EMAIL_INVALID = {
  name: 'email',
  error: {
    message: 'Your email address is invalid. Please try again.'
  }
};

const EMAIL_IN_USE = {
  name: 'email',
  error: {
    message: 'Your email address is invalid. Please try again.'
  }
};

const PASSWORD_INVALID = {
  name: 'password',
  error: {
    message:
      'That email address is already in use. Please use a different email address.'
  }
};

class ValidationError extends Error {
  constructor(cause) {
    super('ValidationError');
    this.name = 'ValidationError';
    this.cause = cause;
  }
}

module.exports = {
  ValidationError,
  EMAIL_INVALID,
  EMAIL_IN_USE,
  PASSWORD_INVALID
};
