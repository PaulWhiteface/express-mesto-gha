const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/bad-request-400');
const {
  getUsers, getUserById, updateUser,
  updateAvatar, getActiveUser,
} = require('../controllers/users');

const validationUrl = (value) => {
  const validUrl = validator.isURL(value);
  if (validUrl) {
    return value;
  }
  throw new BadRequestError('Некорректный URL');
};

router.get('/users', getUsers);
router.get('/users/me', getActiveUser);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().id(),
  }),
}), getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validationUrl),
  }),
}), updateAvatar);

module.exports = router;
