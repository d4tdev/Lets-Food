const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.post('/register', authController.handleCreateUser);
router.post('/verifyOTP/:userId', authController.handleVerifyUser);
router.post('/resendOTP/:userId', authController.handleResendOTP);


module.exports = router;
