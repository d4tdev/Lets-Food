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
		res.redirect('/admin');
		next();
	} else {
		res.redirect('/home');
	}
};

module.exports = { validUser, validAuth };
