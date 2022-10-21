const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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
   },
   element: {
      type: String,
      required: true,
   },
   processing:{
      type: String,
      required: true,
   }
   
}, { collection: 'Product', timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
