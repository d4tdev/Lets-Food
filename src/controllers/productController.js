const productService = require('../services/productServices');

class productController {
   createProduct = async (req, res) => {
      try {
         const product = await productService.createProduct(
            req.body.name,
            req.body.price,
            req.body.description,
            req.body.image,
            req.body.category
         );
         return res.status(200).json(product);
      } catch (err) {
         return res.status(500).json({ message: e.message });
      }
   };
   deleteProduct = async (req, res) => {
      try {
         const product = await productService.deleteProduct(req.params.id);
         return res.status(200).json(product);
      } catch (err) {
         return res.status(500).json(err);
      }
   };
}

module.exports = new productController();
