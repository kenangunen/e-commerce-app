const mongoose = require('mongoose');
const dbConf = require('./databaseConfig');
const Product = require('../models/ProductModel');

// db connection
const connectDB = async () => {
  try {
    await mongoose.connect(dbConf.dbURL, dbConf.options);

    // Check the existence of each model and create if not present
    await checkAndCreateModel(Product);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // If the connection fails, process.exit(1) will cause your application to shut down.
  }
};

// When the connection is successful
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection successfully established!');
});

// When a connection error occurs
mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error! ${err}`);
});

// When disconnected
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection has been lost.');
});

// Check the existence of the model and create if no0t present
const checkAndCreateModel = async model => {
  try {
    // If the model already exists, continue
    mongoose.model(model.modelName);
  } catch {
    // If the model does not exist, create it
    await model.init();
  }
};

module.exports = connectDB;
