const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/show', orderController.handleShowAllOrder);

module.exports = router;
