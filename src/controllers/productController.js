const product = require('../models/Product');
const cart = require('../models/Cart');
const cartProduct = require('../models/CartProduct');
const user = require('../models/User');

const productController = {
   createProduct: async (req, res) => {
      try {
         // const newProducts = new product(req.body);
         // const savaProduct = await newProducts.save();
         // res.status(200).json(savaProduct);
         let { name, price, description, image, category, ingredient, process } = req.body;

         if (!name || !price || !description || !image || !ingredient || !process) {
            return res.render('admin_addProduct', { message: 'Vui lòng điền đầy đủ thông tin' });
         }

         if (!category) {
            category = 'Đồ ăn';
         }

         await product.create({
            name,
            price,
            description,
            image,
            category,
            ingredient,
            process,
         });

         res.redirect('/auth/admin');
         return res.render('admin_products', { message: 'Thêm sản phẩm thành công' });
      } catch (err) {
         res.render('admin_addProduct', { message: 'Thêm sản phẩm thất bại' });
      }
   },

   getProductJson: async (req, res) => {
      try {
         const products = await product.find({});
         res.status(200).json(products);
      } catch (err) {
         res.status(500).json(err);
      }
   },

   getAllProduct: async (req, res) => {
      try {
         const users = await user.find({});
         const products = await product.find({});
         return res.render('admin_products', {
            products,
            countProducts: products.length,
            countUsers: users.length,
         });
      } catch (err) {
         res.render('admin_products', { message: 'Lỗi' });
      }
   },

   updateProduct: async (req, res) => {
      try {
         const { productId } = req.params;
         const productItem = await product.findById(productId);
         await productItem.updateOne({ $set: req.body });

         res.render('admin_products', { message: 'Cập nhật sản phẩm thành công' });
      } catch (err) {
         res.render('admin_products', { message: 'Cập nhật sản phẩm thất bại' });
      }
   },

   deleteProduct: async (req, res) => {
      try {
         // await cart.updateMany({ products: req.params.id }, { $pull: { products: req.params.id } });
         // await cartProduct.updateMany({ productId: req.params.id }, { productId: null });
         // const products = await product.findByIdAndDelete(req.params.id);
         // res.status(200).json(products);
         const { productId } = req.params;
         const productItem = await product.findById(productId);
         await productItem.deleteOne();

         res.render('admin_products', { message: 'Xóa sản phẩm thành công' });
      } catch (err) {
         return res.render('admin_products', { message: 'Xóa sản phẩm thất bại' });
      }
   },
};

module.exports = productController;
