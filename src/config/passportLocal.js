const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

module.exports = function (passport) {
	passport.use(
		'local-login',
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				try {
					const user = await User.findOne({ username });
					if (!user) {
						return done(null, false, req.flash('loginLocal', 'Tài khoản hoặc mật khẩu không chính xác'));
					}
					if (!user.comparePassword(password)) {
						return done(null, false, req.flash('loginLocal', 'Tài khoản hoặc mật khẩu không chính xác'));
					}
					const empty = [
						
					]
					return done(null, user);
				} catch (e) {
					done(e);
				}
			}
		)
	);

	// used to serialize the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	// used to deserialize the user
	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
