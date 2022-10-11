const Cart = require('../models/Cart');
const Product = require('../models/Product');
const CartProduct = require('../models/CartProduct');
const User = require('../models/User');

const createCart = (productId, userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         // product require
         if (!productId) {
            return reject('Product id is required');
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
         let cart = await Cart.findOne({ userId: userId });
         if (!cart) {
            const newCartProduct = await CartProduct.create({
               productId: productId,
               userId: userId,
            });
            const newCart = await Cart.create({ userId: userId });
            await newCart.updateOne({ $push: { products: newCartProduct._id } });

            return resolve({ newCart, msg: 'Cart created' });
         } else {
            let cartProduct = await CartProduct.findOne({
               productId: productId,
               userId: userId,
            });
            if (!cartProduct) {
               const newCartProduct = await CartProduct.create({
                  productId: productId,
                  userId: userId,
               });
               await cart.updateOne({ $push: { products: newCartProduct._id } });
               return resolve({ msg: 'Product added to cart' });
            } else {
               let newQuantity = +cartProduct.quantity + 1;
               await cartProduct.updateOne({quantity: newQuantity});
               return resolve({ msg: 'Product quantity updated' });
            }
         }
      } catch (e) {
         reject(e);
      }
   });
};

const getCart = userId => {
   return new Promise(async (resolve, reject) => {
      try {
         const cart = await Cart.findOne({ userId: userId }).populate({
            path: 'products',
            populate: { path: 'productId' },
         });

         if (!cart) {
            return reject({ msg: 'Cart not found' });
         }

         return resolve(cart);
      } catch (e) {
         return reject(e);
      }
   });
};

const deleteCart = (productId, userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         const cart = await Cart.updateOne({userId: userId},{$pull : {products: productId}});

         if (!cart) {
            return reject({ msg: 'Cart not found' });
         }

         return resolve(cart);
      } catch (e) {
         return reject(e);
      }
   });
};

module.exports = { createCart, getCart , deleteCart };
