const mongoose = require('mongoose');
const dbConf = require('./databaseConfig');

// db connection
mongoose.connect(dbConf.dbURL, dbConf.options);

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
