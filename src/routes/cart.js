const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cartController');

router.post('/create/:productId', CartController.handleCreateCart);

module.exports = router;
