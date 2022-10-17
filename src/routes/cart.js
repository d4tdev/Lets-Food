const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.get('/create/:productId', cartController.handleCreateCart);
router.get('/show/:userId', cartController.handleShowCart);
router.delete('/delete-one/:productId', cartController.handleDeleteOneCartProduct);
router.delete('/delete-all', cartController.handleDeleteAllCartProduct);
router.patch('/update-quantity/:productId', cartController.handleUpdateQuantity);
router.patch('/update-quantity-plus/:productId', cartController.handleUpdateQuantityPlus);
router.patch('/update-quantity-minus/:productId', cartController.handleUpdateQuantityMinus);
router.post('/checkout', cartController.handleCheckout);

module.exports = router;
