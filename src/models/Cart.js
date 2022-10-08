const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
   },
   products:{
      name: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      }
   },
   quantity: {
      type: Number,
      required: true,
   },
},{ collection: 'Cart-demo'})

module.exports = mongoose.model('Cart-demo', cartSchema);