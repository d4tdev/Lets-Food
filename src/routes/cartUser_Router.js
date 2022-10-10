const cartController = require('../controllers/cartUser_Controller')
const cart = require('../models/Cart');
const express = require('express');
const cartUser = require('../models/CartUser')
const router = express.Router();

router.post('/cartUser/create/:id', cartController.CreateCart);
// router.put('/cartUser/Update/:id', cartController.UpdateCart);
router.get('/cartUser/create/:id',(req, res) =>{
    return cart.findById(req.params.id)
    .then((data) =>{
        res.json(data);
    })
})
module.exports = router;  
