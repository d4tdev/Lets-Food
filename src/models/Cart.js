const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
   },
   products: [
      {
         productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
         },
         quantity: {
            type: Number,
            required: true,
         },
      },
   ]
}, { collection: 'Cart', timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
