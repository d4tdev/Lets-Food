const cartService = require('../services/cartService');
const Cart = require('../models/Cart');

class CartController {
   handleCreateCart = async (req, res) => {
      try {
         const productId = req.params.productId;
         const { _id } = req.user;
         // const { _id } = req.body;
         const cart = await cartService.createCart(productId, _id);
         // return res.status(200).json(cart);
         return res.redirect('/home');
      } catch (e) {
         return res.render('home', { message: e.message });
      }
   };

   handleShowACart = async (req, res) => {
      try {
         const { userId } = req.params;
         const cart = await cartService.getACart(userId);

         return res.render('gioHang', { cart, user: req.user, message: '' });
      } catch (e) {
         // return res.status(500).json({ message: e.message });
         return res.render('gioHang', { cart: null, message: e.message });
      }
   };

   handleUpdateQuantity = async (req, res) => {
      try {
         const { productId } = req.params;
         const { _id } = req.user;
         const { quantity } = req.body;
         if (!productId) {
            return res.status(400).json({ message: 'Product id is required' });
         }
         if (!quantity) {
            return res.status(400).json({ message: 'Quantity is required' });
         }

         const cart = await cartService.updateQuantity(productId, _id, quantity);

         return res.status(200).json(cart);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   };

   handleUpdateQuantityPlus = async (req, res) => {
      try {
         const { productId } = req.params;
         const { _id } = req.user;
         if (!productId) {
            return res.render('gioHang', { message: 'Product id is required' });
         }

         const cart = await cartService.updateQuantityPlus(productId, _id);

         // return res.status(200).json(cart);
         res.redirect('/cart/show/' + _id);
         return res.render('gioHang', { cart, user: req.user, message: '' });
      } catch (e) {
         return res.render('gioHang', { message: e.message });
      }
   };

   handleUpdateQuantityMinus = async (req, res) => {
      try {
         const { productId } = req.params;
         const { _id } = req.user;
         if (!productId) {
            return res.status(400).json({ message: 'Product id is required' });
         }

         const cart = await cartService.updateQuantityMinus(productId, _id);

         // return res.status(200).json(cart);
         res.redirect('/cart/show/' + _id);
         return res.render('gioHang', { cart, user: req.user, message: '' });
      } catch (e) {
         return res.render('gioHang', { message: e.message });
      }
   };

   handleDeleteOneCartProduct = async (req, res) => {
      try {
         const { productId } = req.params;
         const { _id } = req.user;
         if (!productId) {
            return res.status(400).json({ message: 'Product id is required' });
         }

         const cart = await cartService.deleteOneCartProduct(productId, _id);

         // res.status(200).json(cart);
         res.redirect('/cart/show/' + _id);
         return res.render('gioHang', { cart, message: 'Xóa sản phẩm thành công', user: req.user });
      } catch (e) {
         return res.render('404', { message: e.message });
      }
   };

   handleDeleteAllCartProduct = (req, res) => {
      try {
         const { _id } = req.user;
         const cart = cartService.deleteAllCartProduct(_id);

         return res.status(200).json(cart);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   };

   handleCheckout = async (req, res) => {
      try {
         const user = req.user;
         // const { user } = req.body;
         const { note } = req.body;
         const message = await cartService.checkOut(user, note);

         let cart = null;
         res.redirect('/cart/show/' + user._id);
         return res.render('gioHang', { message, cart, user: req.user });
      } catch (e) {
         let cart = await Cart.findOne({ userId: req.user._id }).populate({
            path: 'products',
            populate: { path: 'productId' },
         });
         console.log(e);
         return res.render('gioHang', { cart, message: e, user: req.user });
      }
   };
}

module.exports = new CartController();
