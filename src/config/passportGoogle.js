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
               avatar: profile.photos[0].value
            };
				try {
               let user = await User.findOne({googleId: profile.id});

               if (user) {
                  done(null,  user);
               } else {
                  user = await User.create(newUser);

                  // let sendOtp = await authService.sendOtpVerification(user)

                  // if (sendOtp) {
                  //    console.log(sendOtp)
                  //    done(null,  user);
                  // }
                  done(null, user);
               }
				} catch (e) {
					console.error(e);
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
