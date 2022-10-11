const product = require('../models/Product');

const productController = {
  createProduct: async (req, res) => {
    try{
      const newProducts = new product(req.body);
      const savaProduct = await newProducts.save();
      res.status(200).json(savaProduct);
    }
    catch(err){
      res.status(500).json(err);
    }
  },

  getProduct: async (req, res) =>{
    try{
     const products = await product.find();
     res.status(200).json(products);
    }
    catch(err){
      res.status(500).json(err);
    }
  },

  updateProduct: async (req, res) => {
    try{
      const products = await product.findByIdAndUpdate(req.params.id,{
         name: req.body.name,
         price: req.body.price,
         description: req.body.description,
         image: req.body.image,
         category: req.body.category
      });

      res.status(200).json(products);
     }
     catch(err){
       res.status(500).json(err);
     }
  },

  deleteProduct: async (req, res) => {
    try{
      const products = await product.findByIdAndDelete(req.params.id);
      res.status(200).json(products);
     }
     catch(err){
       res.status(500).json(err);
     }
  }
}

module.exports = productController;