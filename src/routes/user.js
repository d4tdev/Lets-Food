const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/register', userController.handleCreateUser);
router.post('/verifyOTP/:userId', userController.handleVerifyUser);
router.post('/resendOTP/:userId', userController.handleResendOTP);


module.exports = router;
