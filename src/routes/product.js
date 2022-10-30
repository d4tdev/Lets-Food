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

router.patch('/update/:productId', productController.updateProduct);

router.get('/get_one_product/:productId', productController.getOneProduct);

router.get('/get_one_product_admin/:productId', productController.getOneProductAdmin);

module.exports = router;
