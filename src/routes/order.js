const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

const { validAuth } = require('../middleware/checkAuthentication');

router.get('/best_sell', orderController.handleShowProductBestSell);
router.get('/show/:id', validAuth,  orderController.handleShowOrderById);
router.get('/show', orderController.handleShowAllOrder);

module.exports = router;
