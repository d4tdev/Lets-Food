const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   products: [{
      productId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'CartProduct',
      },
   }],
   status: {
      type: String,
   },
   number: {
      type: String,
   },
   address: {
      type: String,
   },
   note: {
      type: String,
   },
   expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: '30d' },
   }
}, {collection: 'Order', timestamps: true});

module.exports = mongoose.model('Order', OrderSchema);
