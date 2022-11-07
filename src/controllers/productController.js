const product = require('../models/Product');
const cart = require('../models/Cart');
const cartProduct = require('../models/CartProduct');

const productController = {
   createProduct: async (req, res) => {
      try {
         const newProducts = new product(req.body);
         const savaProduct = await newProducts.save();
         res.status(200).json(savaProduct);
      } catch (err) {
         res.status(500).json(err);
      }
   },

   getProduct: async (req, res) => {
      try {
         const products = await product.find({});
         res.status(200).json(products);
      } catch (err) {
         res.status(500).json(err);
      }
   },

   updateProduct: async (req, res) => {
      try {
         const products = await product.findById(req.params.id);
         await products.updateOne({ $set: req.body });

         res.status(200).json('Updated successfully!');
      } catch (err) {
         res.status(500).json(err);
      }
   },

   deleteProduct: async (req, res) => {
      try {
         await cart.updateMany({ products: req.params.id }, { $pull: { products: req.params.id } });
         await cartProduct.updateMany({ productId: req.params.id }, { productId: null });
         const products = await product.findByIdAndDelete(req.params.id);
         res.status(200).json(products);
      } catch (err) {
         res.status(500).json(err);
      }
   },
};

module.exports = productController;
