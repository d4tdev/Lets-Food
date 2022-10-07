const cartService = require('../services/cartSevices');

class CartController {
    CreateCart = async (req, res) => {
        try {
			const cart = await cartService.createCart( req.params.id,req.body.quantity);
			return res.status(200).json(cart);
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
    }
}

module.exports = new CartController();