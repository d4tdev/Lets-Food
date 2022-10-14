const cartService = require('../services/cartService');

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
         return res.status(500).json({ message: e.message });
      }
   };

   handleShowCart = async (req, res) => {
      try {
         const { userId } = req.params;
         const cart = await cartService.getCart(userId);

         return res.render('gioHang', { cart, user: req.user });
      } catch (e) {
         // return res.status(500).json({ message: e.message });
         return res.render('404');
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
            return res.status(400).json({ message: 'Product id is required' });
         }

         const cart = await cartService.updateQuantityPlus(productId, _id);

         return res.status(200).json(cart);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   }

   handleUpdateQuantityMinus = async (req, res) => {
      try {
         const { productId } = req.params;
         const { _id } = req.user;
         if (!productId) {
            return res.status(400).json({ message: 'Product id is required' });
         }

         const cart = await cartService.updateQuantityMinus(productId, _id);

         return res.status(200).json(cart);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   }

   handleDeleteOneCartProduct = (req, res) => {
      try {
         const { productId } = req.params;
         const { _id } = req.user;
         if (!productId) {
            return res.status(400).json({ message: 'Product id is required' });
         }

         const cart = cartService.deleteOneCartProduct(productId, _id);

         // res.status(200).json(cart);
         return res.redirect('/cart/show/' + _id);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   }

   handleDeleteAllCartProduct = (req, res) => {
      try {
         const { _id } = req.user;
         const cart = cartService.deleteAllCartProduct(_id);

         return res.status(200).json(cart);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   }
};


module.exports = new CartController();
