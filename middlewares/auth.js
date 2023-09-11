const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error-401');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-key');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};
