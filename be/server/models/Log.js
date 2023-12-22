const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    message: String
  },
  { capped: 1024 } // maximum file size
);

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
