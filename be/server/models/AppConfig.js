const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  currency: {
    type: String,
    default: 'Dolar'
  },
  currencySymbol: {
    type: String,
    default: '$'
  }
});

const AppConfigSchema = mongoose.model('AppConfig', appSchema);

module.exports = AppConfigSchema;
