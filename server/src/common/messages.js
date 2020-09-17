const defaultMessage = 'Course Planner API';
const createNotFoundMessage = url => `Not found - ${url}`;
const emailInUse = 'Email in use.';
const invalidLogin = 'Invalid login.';
const userNotExisting = 'User does not exist.';
const invalidToken = 'Invalid token.';
const accessNotAllowed = 'Access not allowed.';
const courseTypeAlreadyDefined = 'Course type already defined.';
const courseTypeDeleted = 'Course type successfully deleted.';

module.exports = {
  defaultMessage,
  createNotFoundMessage,
  emailInUse,
  invalidLogin,
  userNotExisting,
  invalidToken,
  accessNotAllowed,
  courseTypeAlreadyDefined,
  courseTypeDeleted
};
