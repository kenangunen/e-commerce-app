const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoriController');

// Category list
router.get('/categories', categoryController.getAllCategory);
