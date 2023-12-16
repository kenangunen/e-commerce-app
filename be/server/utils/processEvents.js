const mongoose = require('mongoose');

// This function sets up event listeners for unexpected errors,
// such as unhandled promise rejections or uncaught exceptions.
const processEvents = () => {
  // Listen for uncaught exceptions, typically asynchronous errors
  process.on('uncaughtException', err => {
    console.error('An unexpected error occurred:', err);
    // You can perform application shutdown procedures if needed.
  });

  // Listen for the SIGTERM signal, which is often used to gracefully terminate the application.
  process.on('SIGTERM', () => {
    console.log('application is closing...');
    // You can perform application shutdown procedures if needed.
  });

  // Listen for the SIGINT signal, often triggered by pressing Ctrl+C in the terminal.
  // It's commonly used for manually interrupting the application during development.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Application has been closed, closing MongoDB connection.');
      process.exit(0);
    });
  });
};

module.exports = processEvents;
