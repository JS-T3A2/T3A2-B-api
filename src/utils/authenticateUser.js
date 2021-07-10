const { verifyToken } = require('./authToken');

const authenticateUser = (req) => {
  const token = getAuthTokenFromRequest(req);

  return verifyToken(token);
};

const getAuthTokenFromRequest = (req) => {
  const header = req.get('Authorization');

  if (header) {
    const [bearer, token] = header.split(' ');
    return bearer === 'Bearer' && token ? token : null;
  } else {
    return null;
  }
};

module.exports = { authenticateUser };
