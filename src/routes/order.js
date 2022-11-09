const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/best_sell', orderController.handleShowProductBestSell);
router.get('/show/:id', orderController.handleShowOrderById);
router.get('/show', orderController.handleShowAllOrder);

module.exports = router;
