const CartController = require('../controllers/cartController')
const express = require('express')
const cart = require('../models/Cart');

const router = express.Router();

router.get('/cart/GetCart',(req, res)=>{
    cart.find()
    .then(data => res.json(typeof data))
})

router.post('/cart/Create/:id', CartController.CreateCart);

router.delete('/cart/Delete/:id', CartController.DeleteCart)


module.exports = router;