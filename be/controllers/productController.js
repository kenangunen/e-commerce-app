const Procust = require('../models/Product');
const { notFoundError } = require('../utils/errors')

// fetch all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.json(products);
    } catch (error) {
        next(error);
    }
}

// fetch a specific product
const getProductById = async (req, res, next) => {
    const product = req.param.productId;
    try {
        const product = await Product.findById(productId);

        notFoundError(productId, 'product');

        res.json(product);
    } catch (error) {
        next(error);
    }
}

// add a new product
const addProduct = async (req, res, next) => {
    const { name, price, description } = req.body;
    //TODO: use JOI for validation req data.
    const newProduct = new Product({ name, price, description });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        next(error);
    }
}

// update a product
const updateProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const { name, price, description } = req.body;
    //TODO: use JOI for validation req data.

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, description },
            { new: true }
        );

        notFoundError(updatedProduct, 'updatedProduct');

        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// delete a product
const deleteProduct = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        notFoundError(deletedProduct, 'deletedProduct');

        res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}