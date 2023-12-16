const AppConfigSchema = require('../models/AppConfigModal');

// Fetch all products
const getAllAppConfig = async (req, res, next) => {
  try {
    const appConnfig = await AppConfigSchema.find();
    res.json(appConnfig);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllAppConfig
};
