const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const ROLES = {
  TRAINER: 'TRAINER',
  ADMIN: 'ADMIN'
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    roles: {
      type: [String],
      default: [ROLES.TRAINER]
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getProperties = function () {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    roles: this.roles
  };
};

userSchema.methods.getPropertiesForToken = function () {
  return {
    id: this._id,
    roles: this.roles
  };
};

userSchema.statics.getRoles = function () {
  return ROLES;
};

module.exports = mongoose.model('User', userSchema);
