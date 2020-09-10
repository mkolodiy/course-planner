const jwt = require('jsonwebtoken');

const sign = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });
};

const verify = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

module.exports = {
  sign,
  verify
};
