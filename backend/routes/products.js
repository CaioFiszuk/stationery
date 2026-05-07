const router = require('express').Router();
const { 
    createProduct, 
    getAllProducts, 
    getProduct, 
    deleteProduct, 
    updateProduct 
} = require('../controllers/products');

const { protect, isAdmin } = require('../middlewares/auth');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProduct);
router.delete('/:productId', deleteProduct);
router.patch('/:productId', updateProduct);

module.exports = router;