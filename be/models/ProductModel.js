const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  description: String,
  category: String,
  stock: Number,
  images: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
