const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product list
router.get('/products', productController.getAllProducts);

// Get a specific product
router.get('/products/:productId', productController.getProductById);

// Get products by categoryName
router.get('products/:categoryName', productController.getProductsByCategory);

// Add a new product
router.post('/products', productController.addProduct);

// Update a product
router.put('/products/:productId', productController.updateProduct);

// Delete a product
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
