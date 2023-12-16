const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const productSchema = new mongoose.Schema({
  productId: {
    type: 'UUID',
    default: () => randomUUID()
  },
  name: {
    type: String,
    required: [true, '{PATH} alanı zorunludur.'],
    maxlength: [50, '{PATH}  alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.'],
    minlength: [3, '{PATH}  alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır. ']
  },
  categoryName: {
    type: String,
    minlength: [3, 'Kategori alanı minimum {MINLENGTH} karakter olabilir.'],
    maxlength: 30
  },
  price: {
    type: Number,
    required: [true, '{PATH} alanı zorunludur.']
  },
  description: {
    type: String,
    maxlength: [200, '{PATH}  alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.'],
    required: [true, '{PATH} alanı zorunludur.']
  },
  stock: {
    type: Number,
    required: [true, '{PATH} alanı zorunludur.']
  },
  images: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
