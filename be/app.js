const processEvents = require('./utils/processEvents');
const setProcessTitle = require('./config/processTitle');
const app = require('./config/express');
const connectDB = require('./config/database');

// Connect mongoDB
connectDB();

// Set process title
setProcessTitle();

// listen events
processEvents();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
