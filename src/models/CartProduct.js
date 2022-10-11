const mongoose = require('mongoose');

const CartUserSchema = new mongoose.Schema(
   {
      productId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product',
         required: true,
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Cart',
         required: true,
      },
      quantity: {
         type: Number,
			default: 1,
      },
   },
   { collection: 'CartProduct' }
);

module.exports = mongoose.model('CartProduct', CartUserSchema);
