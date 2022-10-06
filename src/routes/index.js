const authRouter = require('./auth');

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
