const express = require('express');
const { authController } = require('../controllers');
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.login);

module.exports = router;
