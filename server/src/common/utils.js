const getAllowedUserFields = user => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  roles: user.roles
});

const getUserFieldForToken = user => ({
  id: user._id,
  roles: user.roles
});

module.exports = {
  getAllowedUserFields,
  getUserFieldForToken
};
