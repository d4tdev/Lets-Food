const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.post('/create/:productId', cartController.handleCreateCart);
router.get('/show/:userId', cartController.handleShowCart);

module.exports = router;
