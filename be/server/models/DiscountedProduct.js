const mongoose = require('mongoose');
const Product = require('./Product'); // main schema 

const discountedProductSchema = new mongoose.Schema({
  discountPercentage: Number,
});

// Create a discriminator model named 'DiscountedProduct' based on the 'Product' schema,
// using the 'discountedProductSchema' to define additional properties for discounted products.
const DiscountedProduct = Product.discriminator('DiscountedProduct', discountedProductSchema);

/**
 ** Sample
 * const product1 = new Product({ name: 'Laptop', price: 1000 });
 *  const product2 = new DiscountedProduct({ name: 'Smartphone', price: 500, discountPercentage: 10 });
 */

module.exports = DiscountedProduct;