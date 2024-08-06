const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/product', productController.createProduct);
router.get('/products', productController.getProducts);
router.delete('/product/:id', productController.deleteProduct);
router.get('/product/:id', productController.showProduct);
router.put('/product/:id', productController.updateProduct);

module.exports = router;