const authRouter = require('./auth');
const cartUserRouter = require('./cartUser_Router');
const cartRouter = require('./cartRouter');
const userRouter = require('./user');
const productRouter = require('./productRouter');
const { validAuth } = require('../middleware/checkAuthentication');

const routes = app => {
	app.use('/auth', authRouter);
	app.use('/auth', cartUserRouter);
	app.use('/auth', cartRouter);
	app.use('/auth', productRouter);
	app.use('/user', userRouter);

	app.use('/home', validAuth, (req, res) => {
		res.json(req.user);
	});
	// app.use('/', (req, res) => {
	// 	res.render('home', { user: req.user });
	// });
};

module.exports = routes;
