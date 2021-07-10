const login = (_, { loginData: { email, password } }, { req: { body } }) => {
  console.log(email, password);
  console.log(body);

  return { authToken: 'S' };
};

module.exports = { login };
