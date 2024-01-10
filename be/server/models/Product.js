const mongoose = require('mongoose');
const Brand = require('./Brand');
const { setStockStatusOnSave, handleUpdateVersionMiddleware } = require('../middleware/productMiddleware');
const { colorNameList } = require('../constants/productConstant');

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      uuid: { type: String, match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/ },
    },
    productName: {
      type: String,
      min: 2,
      max: 100,
      required: true
    },
    colorName: {
      type: String,
      enum: colorNameList,
      required: true
    },
    sellerName: {
      // sellerId tut, seller tablosundan isimlerini al.
      type: String,
      min: 2,
      max: 100,
      required: true,
    },
    brandName: {
      // brandId tut, brand tablosundan isimlerini al.
      type: String,
      required: true,
      enum: [],
      validate: {
        validator: async function (value) {
          const brands = await Brand.find({}, 'name');
          const brandNames = brands.map(brand => brand.name);
          return brandNames.includes(value);
        },
        message: props => `${props.value} is not a valid brand!`,
      }
    },
    categoryName: {
      type: String,
      min: 2,
      max: 100,
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      min: 2,
      max: 100,
      required: true
    },
    stockCount: {
      type: Number,
      required: true
    },
    stockStatus: {
      type: Boolean,
      default: true,
      required: true
    },
    image: Buffer,
    addedDate: {
      type: Date,
      default: Date.now()
    }
  },
  {
    strict: true, // An undefined field in the schema, however, due to strict mode, it is not saved.
    strictQuery: 'throw', // "throw": Throw an error for unknown fields.
    shardKey: { categoryName: 1 },
    discriminatorKey: 'productType',
    toJSON: { virtuals: true },
    optimisticConcurrency: true,
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
handleUpdateVersionMiddleware(productSchema);

//statics method
productSchema.statics.findByCategoryName = function (categoryName) {
  return this.find({ categoryName: categoryName });
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
