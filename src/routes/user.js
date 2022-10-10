const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/user/:userId', userController.getUserProfile);

router.post('/reset_password', userController.resetPassword);
router.post('/verify_reset_password/:userId', userController.verifyResetPassword);
router.post('/change_password/:userId', userController.changePassword);
router.post('/update_profile/:userId', userController.updateUserProfile);

module.exports = router;
