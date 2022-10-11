const cartService = require('../services/cartService');

class CartController {
   handleCreateCart = async (req, res) => {
      try {
         const productId = req.params.productId;
         const { _id } = req.user;
         // const { _id } = req.body;
         const cart = await cartService.createCart(productId, _id);
         return res.status(200).json(cart);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   };

   handleShowCart = async (req, res) => {
      try {
         const { userId } = req.params;
         const cart = await cartService.getCart(userId);

         return res.status(200).json(cart);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   };

   handleUpdateQuantity = async (req, res) => {
      try {
         const { productId, userId } = req.params;
         const { quantity } = req.body;
         const cart = await cartService.updateQuantity(productId, userId, quantity);

         return res.status(200).json(cart);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   };
}

module.exports = new CartController();
