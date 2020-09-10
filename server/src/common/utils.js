const getAllowedUserFields = user => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email
});

module.exports = {
  getAllowedUserFields
};
