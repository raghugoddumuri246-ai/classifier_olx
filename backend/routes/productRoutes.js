const express = require('express');
const router = express.Router();
const {
    createProduct,
    getMyProducts,
    promoteProduct,
    getProducts,
    getProductById
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProducts)
    .post(protect, createProduct);

router.get('/my', protect, getMyProducts);
router.put('/:id/promote', protect, promoteProduct);
router.get('/:id', getProductById);

module.exports = router;
