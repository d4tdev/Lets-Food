const authRouter = require('./auth');
const cartRouter = require('./cart');
const userRouter = require('./user');
const productRouter = require('./product');
const { validAuth } = require('../middleware/checkAuthentication');

//
//
//
const Cart = require('../models/Cart');
//

const routes = app => {

   app.use('/auth', authRouter);
   app.use('/cart', cartRouter);

   app.use('/user', userRouter);

	app.use('/product', productRouter);

   app.use('/home', async (req, res) => {
      if (req.user) {
         const cart = await Cart.findOne({ userId: req.user._id });
      console.log(cart);
      // res.json(req.user);
      res.render('trangChu', {cart, user: req.user });
      } else {
         res.render('trangChu', {cart: null, user: null });
      }
   });

   app.use('/check_login', (req, res) => {
      res.json(req.user);
   });

   // app.use('/', (req, res) => {
   // 	res.render('home', { user: req.user });
   // });
};

module.exports = routes;
