// routes/contactUsRoutes.js

const express = require('express');
const router = express.Router();
const contactUsController = require('../Controllers/ContactUsController');

router.post('/msgsent', contactUsController.createMessage);

module.exports = router;
