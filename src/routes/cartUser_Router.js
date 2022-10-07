const cartController = require('../controllers/cartUser_Controller')

const express = require('express');

const router = express.Router();

router.post('/cartUser/create', cartController.CreateCart);

module.exports = router;    