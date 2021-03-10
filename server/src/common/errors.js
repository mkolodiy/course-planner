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

const COURSE_TYPE_IN_USE = {
  name: 'name',
  error: {
    message: 'Course type already defined.'
  }
};

const ACCESS_NOT_ALLOWED = 'Access not allowed.';

const COURSE_TYPE_DELETED = 'Course type successfully deleted.';

const COURSE_DELETED = 'Course successfully deleted.';

const PARTICIPANT_DELETED = 'Participant successfully deleted.';

class CustomError extends Error {
  constructor(cause) {
    super('CustomError');
    this.name = 'CustomError';
    this.cause = cause;
  }
}

module.exports = {
  CustomError,
  EMAIL_INVALID,
  EMAIL_IN_USE,
  PASSWORD_INVALID,
  USER_NOT_FOUND,
  TOKEN_INVALID,
  COURSE_TYPE_IN_USE,
  ACCESS_NOT_ALLOWED,
  COURSE_TYPE_DELETED,
  COURSE_DELETED,
  PARTICIPANT_DELETED
};
