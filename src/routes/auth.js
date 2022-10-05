const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/authController');
const { validUser } = require('../middleware/checkAuthentication');

// register local
router.post('/register', authController.handleCreateUser);
router.post('/verifyOTP/:userId', authController.handleVerifyUser);
router.post('/resendOTP/:userId', authController.handleResendOTP);

// website views
// GET /auth/login
router.get('/login', validUser, (req, res) => {
	res.render('index');
});
// GET /auth/loginLocal
router.get('/getLoginLocal', (req, res) => {
	res.render('loginLocal', { message: req.flash('loginLocal') });
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
//   router.get('/account', ensureAuthenticated, function(req, res){
// 	res.render('account', { user: req.user });
//   });

  router.get('/loginFacebook',
  passport.authenticate('facebook', { authType: 'reauthenticate', scope: ['user_posts','email'] }));

router.get('/facebook/callback',

//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
// 	// Successful authentication, redirect home.
// 	res.redirect('/');
//   }
passport.authenticate('facebook', {
	successRedirect: '/home',
	failureRedirect: '/auth/login',
})
  );

//   router.get('/home',(req, res) => {
// 	  res.json(req.user);
//   })

  

// logout
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});



module.exports = router;
