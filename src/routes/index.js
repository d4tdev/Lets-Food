const path = require('path');

const authRouter = require('./auth');
const cartRouter = require('./cart');
const userRouter = require('./user');
const productRouter = require('./product');
const orderRouter = require('./order');
const { validAuth, validAdmin } = require('../middleware/checkAuthentication');

//
//
//
const Cart = require('../models/Cart');
//

const routes = app => {
    app.use('/auth', authRouter);

    app.use('/cart', validAuth, cartRouter);

    app.use('/user', validAuth, userRouter);

    app.use('/product', validAuth, productRouter);

    app.use('/order', orderRouter);

    app.use('/about_us', validAuth, (req, res) => {
        res.render('aboutUs');
    })

    app.use('/faq', (req, res) => {
        res.render('FAQ');
    })

    app.use('/home', async (req, res) => {
        if (req.user) {
            const cart = await Cart.findOne({ userId: req.user._id });
            const role = req.user.role;

            if (cart) {
                // res.json(req.user);
                return res.render('trangChu', { role, cart, user: req.user });
            }
            const newCart = {
                count: 0,
            };
            return res.render('trangChu', { role, cart: newCart, user: req.user });
        } else {
            const role = 'Đéo có role'
            res.render('trangChu', { role, cart: null, user: null });
        }
    });

    app.use('/check_login', validAuth, (req, res) => {
        res.json(req.user);
    });

    app.use('/', (req, res) => {
    	res.redirect('/home');
    });
};

module.exports = routes;
