const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/authController');

// register local
router.post('/register', authController.handleCreateUser);
router.post('/verifyOTP/:userId', authController.handleVerifyUser);
router.post('/resendOTP/:userId', authController.handleResendOTP);


router.get('/login', (req, res) => {
   res.render('login');
})
// login local
router.post('/loginLocal', );

// login google
router.get('/loginGoogle', passport.authenticate('google', { scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {
   successRedirect: '/home',
   failureRedirect: '/login'
}));


// login facebook


module.exports = router;
