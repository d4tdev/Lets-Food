const product = require('../models/Product');
const cart = require('../models/Cart');
const cartProduct = require('../models/CartProduct');
const user = require('../models/User');

const productController = {
   createProduct: async (req, res, next) => {
      try {
         let { name, price, description, image, category, ingredient, process } = req.body;

         if (!name || !price || !description || !image || !ingredient || !process) {
            return res.render('admin_products_add', { message: 'Vui lòng điền đầy đủ thông tin' });
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
         const users = await user.find({});
         const products = await product.find({});

         const Cart = await cart.find({});
         res.render(
            'Admin',
            {
               cart: Cart,
               countProducts: products.length,
               countUsers: users.length,
               message: 'Thêm sản phẩm thành công',
               user: req.user,
               products,
            },
            res.redirect('/product/getAllProduct')
         );
      } catch (err) {
         const users = await user.find({});
         const products = await product.find({});
         const Cart = await cart.find({});

         res.render(
            'admin_products_add',
            {
               countProducts: products.length,
               countUsers: users.length,
               cart: Cart,
               message: 'Thêm sản phẩm thất bại',
               user: req.user,
               products,
            },
            res.redirect('/product/getAllProduct')
         );
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
         return res.render('Admin', {
            products,
            countProducts: products.length,
            countUsers: users.length,
            user: req.user,
            message: '',
         });
      } catch (err) {
         res.render('Admin', { message: 'Lỗi', user: req.user });
      }
   },

   updateProduct: async (req, res, next) => {
      try {
         const { productId } = req.params;
         const productItem = await product.findById(productId);
         let { name, price, description, image, category, ingredient, process } = req.body;

         if (!name || !price || !description || !image || !ingredient || !process) {
            return res.render('admin_products_del', {
               message: 'Vui lòng điền đầy đủ thông tin',
               productItem,
               user: req.user,
            });
         }

         if (!category) {
            category = 'Đồ ăn';
         }

         await productItem.updateOne({
            name,
            price,
            description,
            image,
            category,
            ingredient,
            process,
         });

         res.render(
            'admin_products_del',
            {
               message: 'Cập nhật sản phẩm thành công',
               user: req.user,
               productItem,
            },
            res.redirect(`/product/get_one_product_admin/${productId}`)
         );
      } catch (err) {
         const { productId } = req.params;

         res.render(
            'admin_products_del',
            {
               message: 'Cập nhật sản phẩm thất bại',
               user: req.user,
            },
            res.redirect(`/product/get_one_product_admin/${productId}`)
         );
      }
   },

   deleteProduct: async (req, res, next) => {
      try {
         // await cart.updateMany({ products: req.params.id }, { $pull: { products: req.params.id } });
         // await cartProduct.updateMany({ productId: req.params.id }, { productId: null });
         // const products = await product.findByIdAndDelete(req.params.id);
         // res.status(200).json(products);
         const { productId } = req.params;
         const productItem = await product.findById(productId);
         await productItem.deleteOne();

         const users = await user.find({});
         const products = await product.find({});

         res.render(
            'Admin',
            {
               message: 'Xóa sản phẩm thành công',
               productItem,
               user: req.user,
               products,
               countProducts: products.length,
               countUsers: users.length,
            },
            res.redirect('/product/getAllProduct')
         );
      } catch (err) {
         const users = await user.find({});
         const products = await product.find({});
         res.render(
            'Admin',
            {
               message: 'Xóa sản phẩm thất bại',
               user: req.user,
               products,
               countProducts: products.length,
               countUsers: users.length,
            },
            res.redirect('/product/getAllProduct')
         );
      }
   },

   getOneProduct: async (req, res) => {
      try {
         const { productId } = req.params;
         const productItem = await product.findById(productId);
         return res.render('productItem', {
            productItem,
         });
      } catch (err) {
         res.render('productItem', { message: 'Lỗi', user: req.user });
      }
   },

   getOneProductAdmin: async (req, res) => {
      try {
         const { productId } = req.params;
         const productItem = await product.findById(productId);
         return res.render('admin_products_del', {
            productItem,
         });
      } catch (err) {
         res.render('admin_products_del', { message: 'Lỗi', user: req.user });
      }
   },
};

module.exports = productController;
