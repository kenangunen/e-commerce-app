const bodyParser = require('body-parser');

// JSON verileri için body parser middleware tanımı
const jsonParserMiddleware = bodyParser.json();

module.exports = jsonParserMiddleware;
