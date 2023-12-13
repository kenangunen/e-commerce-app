const cors = require('cors');

// CORS middleware tanımı
const corsMiddleware = cors({
  origin: '*', // İstemcilere erişim izni verilen domainleri belirtin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Kimlik bilgilerinin gönderilmesine izin ver
  optionsSuccessStatus: 204 // OPTIONS isteği başarılı olduğunda durum kodu
});

module.exports = corsMiddleware;
