const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/authController');
const { validUser } = require('../middleware/checkAuthentication');

// register local
router.post('/register', authController.handleCreateUser);
router.post('/verifyOTP/:userId', authController.handleVerifyUser);
router.post('/resendOTP/:userId', authController.handleResendOTP);

// chuyển hướng đến trang đăng ký và hiện thị ra trang dangKy.ejs

router.get('/register', (req, res) => {
    res.render('dangKy');
});

// website views
// GET /auth/login
router.get('/login', validUser, (req, res) => {
    res.render('index');
});
// GET /auth/loginLocal
router.get('/getLoginLocal', (req, res) => {
    res.render('dangNhap', { message: req.flash('loginLocal') });
});

// login local
router.post(
    '/loginLocal',
    passport.authenticate('local-login', {
        successRedirect: '/home',
        failureRedirect: '/auth/getLoginLocal',
        failureFlash: true,
    })
);

// login google
router.get('/loginGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/auth/login',
    })
);

//login facebook
router.get('/loginFacebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/auth/login',
    })
);

// logout
router.get('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    res.redirect('/home');
});

module.exports = router;
