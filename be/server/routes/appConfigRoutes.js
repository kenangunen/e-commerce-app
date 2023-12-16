const express = require('express');
const router = express.Router();
const appConfigController = require('../controllers/appConfigController');

router.get('/appConfig', appConfigController.getAllAppConfig);

module.exports = router;
