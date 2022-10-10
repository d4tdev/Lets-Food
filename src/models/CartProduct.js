const mongoose = require('mongoose');

const CartUserSchema = new mongoose.Schema(
   {
      productId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product',
         required: true,
      },
      cart: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Cart',
         required: true,
      },
      quantity: {
         type: Number,
         required: true,
			default: 1,
      },
   },
   { collection: 'CartProduct' }
);

module.exports = mongoose.model('CartProduct', CartUserSchema);
