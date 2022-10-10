const mongoose = require('mongoose');
const cartSchema = require('./cartSchema');

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
   },
   carts:[ cartSchema]
   }, { collection: 'Cart', timestamps: true });

module.exports = mongoose.model('Cart', CartUserSchema);
