const FacebookStrategy  = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const authService = require('../services/authService');
const User = require('../models/User');

module.exports = function (passport) {

    // app.use(passport.initialize());
    // app.use(passport.session());
    passport.serializeUser(function(user, done) {
    done(null, user);
    });
    
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CB_URL,
        profileFields: ['id', 'displayName', 'photos', 'email','first_name','last_name']
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        return cb(null, profile);
      }
    // async (accessToken, refreshToken, profile, done) => {
    //     const newUser = {
    //        facebookId: profile.id,
    //        firstName: profile.name.givenName,
    //        lastName: profile.name.familyName,
    //        email: profile.emails[0].value,
    //        avatar: profile.photos[0].value
    //     };
    //         try {
    //        let user = await User.findOne({facebookId: profile.id});

    //        if (user) {
    //           done(null,  user);
    //        } else {
    //           user = await User.create(newUser);

    //           // let sendOtp = await authService.sendOtpVerification(user)

    //           // if (sendOtp) {
    //           //    console.log(sendOtp)
    //           //    done(null,  user);
    //           // }
    //           done(null, user);
    //        }
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
      ));
    

}
