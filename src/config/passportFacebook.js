const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const authService = require('../services/authService');
const User = require('../models/User');

module.exports = function (passport) {
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_ID,
				clientSecret: process.env.FACEBOOK_SECRET,
				callbackURL: process.env.FACEBOOK_CB_URL,
				profileFields: ['id', 'displayName', 'photos', 'email', 'first_name', 'last_name'],
			},
			// function (accessToken, refreshToken, profile, cb) {
			// 	console.log(profile);
			// 	return cb(null, profile);
			// }
			async (accessToken, refreshToken, profile, done) => {
				const newUser = {
					facebookId: profile.id,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					email: profile.emails[0].value,
					avatar: profile.photos[0].value,
					authType: 'facebook',
					verified: true,
				};
				try {
					let user = await User.findOne({ facebookId: profile.id, authType: 'facebook' });

					if (user) {
						return done(null, user);
					} else {
						user = await User.create(newUser);

						// let sendOtp = await authService.sendOtpVerification(user)

						// if (sendOtp) {
						//    console.log(sendOtp)
						//    done(null,  user);
						// }
						return done(null, user);
					}
				} catch (e) {
					return done(e, false);
				}
			}
		)
	);

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (user, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
