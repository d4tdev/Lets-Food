const path = require('path');

const authRouter = require('./auth');
const cartRouter = require('./cart');
const userRouter = require('./user');
const productRouter = require('./product');
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

    app.use('/about_us', validAuth, (req, res) => {
        res.render('aboutUs');
    })

    app.use('/home', validAdmin, async (req, res) => {
        if (req.user) {
            const cart = await Cart.findOne({ userId: req.user._id });

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

    app.use('/check_login', validAuth, (req, res) => {
        res.json(req.user);
    });

    app.use('/', validAuth, (req, res) => {
    	res.redirect('/home');
    });
};

module.exports = routes;
