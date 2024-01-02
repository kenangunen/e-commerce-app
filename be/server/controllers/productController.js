const Product = require('../models/ProductModel');
const { checkExistence, checkVersionConflict, checkVersionError } = require('../utils/errors');

// Fetch all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Fetch a specific product
const getProductById = async (req, res, next) => {
  const productId = req.param.productId;

  try {
    const product = await Product.findById(productId);

    checkExistence(productId, 'product', res);

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Fetch all products in a specific category.
const getProductsByCategory = async (req, res, next) => {
  const categoryName = req.param.categoryName;

  try {
    const products = await Product.findByCategoryName(categoryName);

    checkExistence(products, 'products', res);

    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Add a new product
const addProduct = async (req, res, next) => {
  console.log('req: ', req);
  const { productName, colorName, sellerName, brandName, categoryName, price, description, stock, image } = req.body;
  //TODO: use JOI for validation req data.

  const bufferData = Buffer.from(image, 'base64');

  const newProduct = new Product({
    productName,
    colorName,
    sellerName,
    brandName,
    categoryName,
    price,
    description,
    stock,
    image: bufferData
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// Update a product
const updateProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const { name, price, description } = req.body;
  //TODO: use JOI for validation req data.

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price, description }, { new: true });

    checkExistence(updatedProduct, 'updatedProduct', res);

    res.json(updatedProduct);
  } catch (error) {
    checkVersionError(error, res, next);
  }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    checkExistence(deletedProduct, 'deletedProduct', res);

    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};
