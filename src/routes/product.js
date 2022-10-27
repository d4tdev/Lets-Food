const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/create', productController.createProduct);

router.get('/getCreateProduct', (req, res) => {
      res.render('admin_products_add', { message: '' });
});

router.delete('/delete/:productId', productController.deleteProduct);

router.get('/get', productController.getProductJson);

router.get('/getAllProduct', productController.getAllProduct);

router.put('/update/:productId', productController.updateProduct);

module.exports = router;
