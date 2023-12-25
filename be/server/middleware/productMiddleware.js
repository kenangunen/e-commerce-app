// This middleware runs before saving a product document.
// If the stock count of the product (stockCount) is 0, it sets the stock status (stockStatus) to false.
// This ensures that the stock status is automatically set to "false" for products with a stock count of 0.
const setStockStatusOnSave = schema => {
  schema.pre('sava', next => {
    if (this.stockCount === 0) {
      this.stockStatus = false;
    }
    next();
  });
};

module.exports = { setStockStatusOnSave };
