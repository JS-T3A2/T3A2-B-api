const isAuth = (_, __, { user }) => {
  return Boolean(user);
};

module.exports = { isAuth };
