const Cart = require('../models/Cart');
const Product = require('../models/Product');
const CartProduct = require('../models/CartProduct');
const User = require('../models/User');

const createCart = (productId, quantity, userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         // product require
         if (!productId) {
            return reject('Product id is required');
         }
         // quantity require
         if (!quantity) {
            return reject('Quantity is required');
         }
         // user require
         if (!userId) {
            return reject('User id is required');
         }
         const product = await Product.findById(productId);
         if (!product) {
            return reject('Product not found');
         }
         const user = await User.findById(userId);
         if (!user) {
            return reject('User not found');
         }
         const cart = await Cart.findOne({ userId });
         if (!cart) {
            const newCartProduct = await CartProduct.create({
               productId: productId,
               quantity: quantity,
               cart: userId,
            });
            const newCart = await Cart.create({ userId: userId, products: newCartProduct._id });

            return resolve({ newCart, msg: 'Cart created' });
         } else {
            const cartProduct = await CartProduct.findOne({ productId, cart: userId });
            if (!cartProduct) {
               const newCartProduct = await CartProduct.create({
                  productId: productId,
                  quantity: quantity,
                  cart: userId,
               });
               cart.products.push(newCartProduct._id);
               return resolve({ cart, msg: 'Product added to cart' });
            } else {
               cartProduct.quantity += quantity;
               return resolve({ cart, msg: 'Product quantity updated' });
            }
         }
      } catch (e) {
         reject(e);
      }
   });
};

module.exports = { createCart };
