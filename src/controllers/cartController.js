const cartService = require('../services/cartService');

class CartController {
   handleCreateCart = async (req, res) => {
      try {
         const productId = req.params.productId;
         // const { _id } = req.user;
         const { _id } = req.body;
         const cart = await cartService.createCart(productId, req.body.quantity, _id);
         return res.status(200).json(cart);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   };
}

module.exports = new CartController();
