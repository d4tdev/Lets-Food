const express = require('express');
const productController = require('../controllers/productController');
const { validAuth, validAdmin } = require('../middleware/checkAuthentication');


const router = express.Router();

router.post('/create', validAuth, productController.createProduct);

router.get('/getCreateProduct', validAuth, (req, res) => {
   res.render('admin_products_add', { message: '' });
});

router.delete('/delete/:productId', validAuth, productController.deleteProduct);

router.get('/get', productController.getProductJson);

router.get('/getAllProduct', validAuth, productController.getAllProduct);

router.patch('/update/:productId', validAuth, productController.updateProduct);

router.get('/get_one_product/:productId', productController.getOneProduct);

router.get('/get_one_product_admin/:productId', validAuth, productController.getOneProductAdmin);

module.exports = router;
