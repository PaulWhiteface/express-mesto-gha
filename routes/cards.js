const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/bad-request-400');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const validationUrl = (value) => {
  const validUrl = validator.isURL(value);
  if (validUrl) {
    return value;
  }
  throw new BadRequestError('Некорректный URL');
};

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validationUrl),
  }),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.objectl().keys({
    cardId: Joi.string().id(),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.objectl().keys({
    cardId: Joi.string().id(),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.objectl().keys({
    cardId: Joi.string().id(),
  }),
}), dislikeCard);

module.exports = router;
