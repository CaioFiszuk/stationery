const router = require('express').Router();
const { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrderStatus } = require('../controllers/orders');

const { protect, isAdmin } = require('../middlewares/auth');

router.post('/', protect, createOrder);
router.get('/', protect, getAllOrders);
router.get('/my', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.patch('/:id', protect, updateOrderStatus);

module.exports = router;