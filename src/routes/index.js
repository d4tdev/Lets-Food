const authRouter = require('./auth');
const { validAuth } = require('../middleware/checkAuthentication');

const routes = app => {
	app.use('/auth', validAuth, authRouter);
	app.use(
		'/home',
		(req, res) => {
			res.json(req.user);
		}
	);
   app.use('/', (req, res) => {
      res.render('home', {user: req.user});
   });
};

module.exports = routes;
