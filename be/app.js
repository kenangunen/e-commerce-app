const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

const corsMiddleware = require('./middleware/cors');
app.use(corsMiddleware);

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect('mongodb+srv://kenangunen:12345@shopdb.tgsawub.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());

// Product modeli
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now
  },
  isActive: Boolean
});

const Product = mongoose.model('Product', productSchema);

// yeni ürün ekleme endpoint'i
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, imageUrl, isActive } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      isActive
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
