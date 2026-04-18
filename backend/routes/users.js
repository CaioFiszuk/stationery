const router = require('express').Router();
const { getUsers, createUser, login, getUserInfo } = require('../controllers/users');
const { protect, isAdmin } = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);
router.get('/', protect, isAdmin, getUsers);
router.get('/info', protect, getUserInfo);

module.exports = router;