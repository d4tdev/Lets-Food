const express = require('express')
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/product/create', productController.createProduct);

router.delete('/product/delete', productController.deleteProduct);

module.exports = router;
