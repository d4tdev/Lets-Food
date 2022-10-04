const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use('local-login', new LocalStrategy({
   usernameField: 'username',
   passwordField: 'password',
   passReqToCallback: true
}, async (req, username, password, done) => {
   try {

   } catch (e) {
      done(e);
   }
}));

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
