const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполенео'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Минимальная длина поля "name" - 2'],
  },
  about: {
    type: String,
    required: [true, 'Поле "about" должно быть заполенено'],
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Минимальная длина поля "about" - 2'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорретный URl',
    },
    required: [true, 'Поле "avatar" доожно быть заполенено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
