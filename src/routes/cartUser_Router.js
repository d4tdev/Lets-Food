const cartController = require('../controllers/cartUser_Controller')

const express = require('express');

const router = express.Router();

router.post('/cartUser/create/:id', cartController.CreateCart);

module.exports = router;    