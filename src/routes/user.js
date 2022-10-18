const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/show/:userId', userController.getUserProfile);

router.post('/reset_password', userController.resetPassword);
router.post('/verify_reset_password/:userId', userController.verifyResetPassword);
router.post('/change_password/:userId', userController.changePassword);
router.post('/update_profile/:userId', userController.updateUserProfile);

router.get('/forgot_password', (req, res) => {
   res.render('getQuenMatKhau');
});
router.get('/change_password', (req, res) => {
   res.render('doiMatKhau', { user: req.user, message: '' });
});

module.exports = router;
