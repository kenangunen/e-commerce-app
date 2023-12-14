// Express application configuration
const express = require('express');
const corsMiddleware = require('../middleware/cors');
const notFoundMiddleware = require('../middleware/notFound');
const errorHandlerMiddlewate = require('../middleware/errorHandler');

// Create an Express application
const app = express();

// Add middlewares
app.use(corsMiddleware); // Enable CORS support
app.use(express.json()); // JSON parser middleware
// app.use(express.urlencoded({ extended: true })); // parser for formData

// Route definitions
// const productRoutes = require('../routes/productRoutes');
// const userRoutes = require('../routes/userRoutes');

// // Use routes
// app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);

// Send a 404 error for undefined routes
app.use(notFoundMiddleware);

// General error handling
app.use(errorHandlerMiddlewate);

module.exports = app;
