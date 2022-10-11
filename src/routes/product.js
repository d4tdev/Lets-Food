const express = require('express')
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/product/create', productController.createProduct);

router.delete('/product/delete/:id', productController.deleteProduct);

router.put('/product/update/:id', productController.updateProduct );

module.exports = router;
