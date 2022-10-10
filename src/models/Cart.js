const mongoose = require('mongoose');

const CartUserSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
         unique: true,
      },
      products: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartProduct',
            required: true,
            unique: true,
         },
      ],
   },
   { collection: 'Cart', timestamps: true }
);

module.exports = mongoose.model('Cart', CartUserSchema);
