const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
   },
   quantity: {
      type: Number,
      required: true,
   },
},{ collection: 'Cart-demo'})

module.exports = mongoose.model('Cart-demo', cartSchema);