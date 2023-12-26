const mongoose = require('mongoose');
const { randomUUID } = require('crypto');
const { setStockStatusOnSave } = require('../middleware/productMiddleware');

const productSchema = new mongoose.Schema(
  {
    // defined fields
    productId: {
      type: String,
      default: () => randomUUID()
    },
    productName: {
      type: String,
      required: [true, '{PATH} alanı zorunludur.'],
      maxlength: [50, '{PATH}  alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.'],
      minlength: [3, '{PATH}  alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır. ']
    },
    colorName: {
      // collorId tut, color tablosundan isimlerini al.
      type: String,
      required: [true, '{PATH} alanı zorunludur.']
    },
    sellerName: {
      // sellerId tut, seller tablosundan isimlerini al.
      type: String,
      required: [true, '{PATH} alanı zorunludur.']
    },
    brandName: {
      // brandId tut, brand tablosundan isimlerini al.
      type: String,
      required: [true, '{PATH} alanı zorunludur.']
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
    stockCount: {
      type: Number,
      required: [true, '{PATH} alanı zorunludur.']
    },
    stockStatus: {
      type: Boolean,
      default: true,
      required: [true, '{PATH} alanı zorunludur.']
    },
    image: Buffer,
    addedDate: {
      type: Date,
      default: Date.now()
    }
  },
  {
    shardKey: { categoryName: 1 },
    discriminatorKey: 'productType',
    toJSON: { virtuals: true },
    virtuals: {
      fullProductName: {
        get() {
          return this.brandName + '-' + this.productName + '-' + this.colorName;
        },
        set(value) {
          const parts = value.split('-');
          this.brandName = parts[0].trim();
          this.productName = parts[1].trim();
          this.colorName = parts[2].trim();
        }
      }
    }
  }
);

//middileware
setStockStatusOnSave(productSchema);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
