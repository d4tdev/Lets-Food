const mongoose = require('mongoose');

const CartUserSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
   },
   cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
   }
   }, { collection: 'Cart', timestamps: true });

module.exports = mongoose.model('Cart', CartUserSchema);
