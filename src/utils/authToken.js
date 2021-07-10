const jwt = require('jsonwebtoken');
const { isPlainObject } = require('lodash');

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (isPlainObject(payload)) {
      return payload;
    }
  } catch {
    return null;
  }
};

module.exports = { verifyToken };
