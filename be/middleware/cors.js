const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // React uygulamanızın adresi
  credentials: true,
  optionsSuccessStatus: 200, // bazı tarayıcılar için gerekli
};

module.exports = cors(corsOptions);