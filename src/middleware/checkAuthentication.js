const User = require('../models/User');

const validAuth = (req, res, next) => {
   if (req.isAuthenticated()) {
      //req.isAuthenticated() will return true if user is logged in
      next();
   } else {
      res.redirect('/auth/login');
   }
};

const validUser = (req, res, next) => {
   if (!req.isAuthenticated()) {
      next();
   } else {
      res.redirect('/home');
   }
};

const validAdmin = (req, res, next) => {
   if (req.user.role === 'admin') {
      res.redirect('/auth/admin');
      // next();
   } else {
      res.redirect('/home');
   }
};

// const isVerified = async (req, res, next) => {

// 	const { username } = req.body;
//    const user = await User.findOne({ username: username });

//    if (user.verified === true) {
//       next();
//    } else {
//       res.clearCookie('connect.sid');
//       // res.redirect('/auth/getOTPPage/' + user._id);
//       res.render('otp', { user, message: 'Vui lòng xác thực tài khoản' });
//    }
// };

// const isLoading = (req, res, next) => {
// 	if (req.status === 302) {
// 		res.redirect('/loading');
// 	} else {
// 		next();
// 	}
// }

module.exports = { validUser, validAuth, validAdmin };
