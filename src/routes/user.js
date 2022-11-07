const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { validAuth, validAdmin } = require('../middleware/checkAuthentication');

router.get('/show/:userId', validAuth, userController.getUserProfile);

router.post('/reset_password', userController.resetPassword);
router.post('/verify_reset_password/:userId', validAuth, userController.verifyResetPassword);
router.post('/change_password/:userId', validAuth, userController.changePassword);
router.post('/update_profile/:userId', validAuth, userController.updateUserProfile);

router.get('/forgot_password', (req, res) => {
   res.render('getQuenMatKhau', { message: ''});
});
router.get('/verify_reset_password/:userId', (req, res) => {
   res.render('quenMatKhau', { message: ''});
})
router.get('/change_password', validAuth,  (req, res) => {
   res.render('doiMatKhau', { user: req.user, message: '' });
});

module.exports = router;
