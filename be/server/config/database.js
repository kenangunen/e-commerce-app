const mongoose = require('mongoose');
const dbConf = require('./databaseConfig');
const AppConfigSchema = require('../models/AppConfigModal');

// db connection
const connectDB = async () => {
  try {
    await mongoose.connect(dbConf.dbURL, dbConf.options);
    initializeAppConfig();

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

// Function that will run when the application starts
const initializeAppConfig = async () => {
  try {
    // Eğer AppConfig koleksiyonunda herhangi bir belge yoksa ekleyin
    const count = await AppConfigSchema.countDocuments();
    if (count === 0) {
      const defaultConfig = {
        currency: 'USD',
        currencySymbol: '$'
      };
      await AppConfigSchema.create(defaultConfig);
      console.log('Default AppConfig added to the database.');
    }
  } catch (error) {
    console.error('Error initializing AppConfig:', error);
  }
};

module.exports = connectDB;
