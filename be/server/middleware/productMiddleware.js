/**
 * This middleware runs before saving a product document.
 * If the stock count of the product (stockCount) is 0, it sets the stock status (stockStatus) to false.
 * This ensures that the stock status is automatically set to "false" for products with a stock count of 0.
 * @param {*} schema
 */
function setStockStatusOnSave(schema) {
  schema.pre('save', function (next) {
    if (this.stockCount === 0) {
      this.stockStatus = false;
    }
    next();
  });
}

/**
 * Middleware function to handle versioning during findOneAndUpdate operations.
 * This function is designed to be used with Mongoose schemas.
 * It removes the "__v" (version) field from the update command,
 * handles versioning within "$set" and "$setOnInsert" fields,
 * and increments the version number by 1 during the update.
 * @param {*} schema
 */
function handleUpdateVersionMiddleware(schema) {
  schema.pre('findOneAndUpdate', function () {
    const update = this.getUpdate();
    if (update.__v != null) {
      delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
      if (update[key] != null && update[key].__v != null) {
        delete update[key].__v;
        if (Object.keys(update[key]).length === 0) {
          delete update[key];
        }
      }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
  });
}

module.exports = { setStockStatusOnSave, handleUpdateVersionMiddleware };
