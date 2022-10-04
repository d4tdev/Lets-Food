module.exports = (req, res, next) => {
	if (req.isAuthenticated()) {
		//req.isAuthenticated() will return true if user is logged in
		next();
	} else {
		res.redirect('/login');
	}
};
