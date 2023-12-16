const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: 'UUID',
    default: () => randomUUID()
  },
  categoryName: {
    type: String,
    required: [true, '{PATH} alanı zorunludur.'],
    maxlength: [50, '{PATH}  alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.'],
    minlength: [3, '{PATH}  alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır. ']
  },
  //subCategoryName: {
  //}
  countOfProduct: {
    type: Number,
    default: 0
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
