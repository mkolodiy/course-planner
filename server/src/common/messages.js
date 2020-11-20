const defaultMessage = 'Course Planner API';
const createNotFoundMessage = url => `Not found - ${url}`;
const invalidToken = 'Invalid token.';
const accessNotAllowed = 'Access not allowed.';
const courseTypeAlreadyDefined = 'Course type already defined.';
const courseTypeDeleted = 'Course type successfully deleted.';
const courseDeleted = 'Course successfully deleted.';
const participantDeleted = 'Participant successfully deleted.';

module.exports = {
  defaultMessage,
  createNotFoundMessage,
  invalidToken,
  accessNotAllowed,
  courseTypeAlreadyDefined,
  courseTypeDeleted,
  courseDeleted,
  participantDeleted
};
