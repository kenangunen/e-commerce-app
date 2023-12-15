const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product list
router.get('/', productController.getAllProducts);

// Get a specific product
router.get('/:productId', productController.getProductById);

// Add a new product
router.post('/', productController.addProduct);

// Update a product
router.put('/:productId', productController.updateProduct);

// Delete a product
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
