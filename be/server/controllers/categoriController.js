const Category = require('../models/CategoryModal');

// Fetch all categories
const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    next(error); //TODO: res.status
  }
};

// Add category

module.exports = {
  getAllCategory
};
