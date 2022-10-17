const path = require('path');

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
    app.use('/zohoverify/verifyforzoho.html', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/views/verifyforzoho.html'));
    });

    app.use('/auth', authRouter);
    app.use('/cart', cartRouter);

    app.use('/user', userRouter);

    app.use('/product', productRouter);

    app.use('/home', async (req, res) => {
        if (req.user) {
            const cart = await Cart.findOne({ userId: req.user._id });
            console.log(cart);

            if (cart) {
                // res.json(req.user);
                return res.render('trangChu', { cart, user: req.user });
            }
            const newCart = {
                count: 0,
            };
            return res.render('trangChu', { cart: newCart, user: req.user });
        } else {
            res.render('trangChu', { cart: null, user: null });
        }
    });

    app.use('/check_login', (req, res) => {
        res.json(req.user);
    });

    app.use('/', (req, res) => {
    	res.redirect('/home');
    });
};

module.exports = routes;
