const authRouter = require('./auth');
const cartRouter = require('./cart');
const userRouter = require('./user');
const productRouter = require('./product');
const { validAuth } = require('../middleware/checkAuthentication');

const routes = app => {

   app.use('/auth', authRouter);
   app.use('/cart', cartRouter);

   app.use('/user', userRouter);

	app.use('/product', productRouter);

   app.use('/home', (req, res) => {
      // res.json(req.user);
      res.render('trangChu', { user: req.user });
   });

   app.use('/check_login', (req, res) => {
      res.json(req.user);
   });

   // app.use('/', (req, res) => {
   // 	res.render('home', { user: req.user });
   // });
};

module.exports = routes;
