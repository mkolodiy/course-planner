const getAllowedUserFields = user => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email
});

module.exports = {
  getAllowedUserFields
};
