const authRouter = require('./auth');
const cartRouter = require('./cart');
const userRouter = require('./user');
const productRouter = require('./product');
const { validAuth } = require('../middleware/checkAuthentication');

const routes = app => {

   app.use('/auth', authRouter);
   app.use('/cart', cartRouter);

   app.use('/user', userRouter);

	app.use('/auth', productRouter);

   app.use('/home', validAuth, (req, res) => {
      res.json(req.user);
   });
   // app.use('/', (req, res) => {
   // 	res.render('home', { user: req.user });
   // });
};

module.exports = routes;
