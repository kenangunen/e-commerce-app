const processEvents = require('./utils/processEvents');
const setProcessTitle = require('./config/processTitle');
const app = require('./config/express');
require('./config/database'); //db connection

// Diğer Express.js ayarları ve middleware'leri buraya ekleyebilirsiniz.

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

// Set process title
setProcessTitle();

// listen events
processEvents();
