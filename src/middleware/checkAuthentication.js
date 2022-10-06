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

module.exports = { validUser, validAuth };
