const CartController = require('../controllers/cartController')
const express = require('express')
const Product = require('../models/Product')

const router = express.Router();

router.post('/cart/Create/:id', CartController.CreateCart);


module.exports = router;