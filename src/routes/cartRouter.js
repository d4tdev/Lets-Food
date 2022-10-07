const CartController = require('../controllers/cartController')
const express = require('express')
const router = express.Router();

router.post('/cart/create/:id', CartController.CreateCart);

router.post('/cart/:id',(req, res) => {
    res.json(req.params.id);
})

module.exports = router;