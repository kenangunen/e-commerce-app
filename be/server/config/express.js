// Express application configuration
const express = require('express');
const corsMiddleware = require('../middleware/cors');
const notFoundMiddleware = require('../middleware/notFound');
const errorHandlerMiddlewate = require('../middleware/errorHandler');
const productRouter = require('../routes/productRoutes');
const appConfigRouter = require('../routes/appConfigRoutes');

// Create an Express application
const app = express();

// Add middlewares
app.use(corsMiddleware); // Enable CORS support
app.use(express.json()); // JSON parser middleware

// Add endpoints
app.use(productRouter);
app.use(appConfigRouter);

// Send a 404 error for undefined routes
app.use(notFoundMiddleware);

// General error handling
app.use(errorHandlerMiddlewate);

module.exports = app;
