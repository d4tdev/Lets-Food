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
					if (!username || !password) {
						return done(null, false, req.flash('loginLocal', 'Vui lòng nhập đầy đủ thông tin'));
					}
               const user = await User.findOne({ username });
               if (!user) {
                  return done(
                     null,
                     false,
                     req.flash('loginLocal', 'Tài khoản hoặc mật khẩu không chính xác')
                  );
               } else {
						console.log(user.verified)
                  if (user.verified === true) {
                     const isMatch = await user.validPassword(password);

                     if (!isMatch) {
                        return done(
                           null,
                           false,
                           req.flash('loginLocal', 'Tài khoản hoặc mật khẩu không chính xác')
                        );
                     }

                     return done(null, user);
                  } else {
                     return done(
                        null,
                        false,
                        req.flash('loginLocal', 'Vui lòng xác thực tài khoản')
                     );
                  }
               }
            } catch (e) {
               done(e, false);
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
