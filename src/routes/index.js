const authRouter = require('./auth');
const { validAuth } = require('../middleware/checkAuthentication');

const routes = app => {
	app.use('/auth', authRouter);
	app.use(
		'/home',
		(req, res) => {
			res.json(req.user);
		}
	);
};

module.exports = routes;
