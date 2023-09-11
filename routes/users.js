const router = require('express').Router();
const {
  getUsers, getUserById, updateUser,
  updateAvatar, getActiveUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.get('/users/me', getActiveUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
