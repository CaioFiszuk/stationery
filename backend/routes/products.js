const router = require('express').Router();
const { 
    createProduct, 
    getAllProducts, 
    getProduct, 
    getProductBCategory, 
    getProductByName, 
    deleteProduct, 
    updateProduct 
} = require('../controllers/products');

const { protect, isAdmin } = require('../middlewares/auth');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/product', protect, getProductByName);
router.get('/category', protect, getProductBCategory);
router.get('/:productId', protect, getProduct);
router.delete('/:productId', protect, deleteProduct);
router.patch('/:productId', protect, updateProduct);

module.exports = router;