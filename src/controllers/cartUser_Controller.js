const cartService = require('../services/cartUser_Services')

class CartUserService {
    CreateCart = async (req, res) => {
        try {
			const cart = await cartService.createCart(req.params.id, req.body.cartId);
			return res.status(200).json(cart);
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
    }
}


module.exports = new CartUserService();