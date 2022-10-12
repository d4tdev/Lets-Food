const express = require('express')
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/create', productController.createProduct);

router.delete('/delete/:id', productController.deleteProduct);

router.get('/get', productController.getProduct);

router.put('/update/:id', productController.updateProduct );

module.exports = router;
