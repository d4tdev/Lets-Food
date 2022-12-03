const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const authService = require('../services/authService');
const User = require('../models/User');

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_ID,
				clientSecret: process.env.GOOGLE_SECRET,
				callbackURL: process.env.GOOGLE_CB_URL,
			},
			async (accessToken, refreshToken, profile, done) => {
				const newUser = {
					googleId: profile.id,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					email: profile.emails[0].value,
					avatar: profile.photos[0].value,
					authType: 'google',
					verified: true,
				};
				try {
					let user = await User.findOne({ googleId: profile.id, authType: 'google' });

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
