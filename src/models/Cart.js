const mongoose = require('mongoose');
const cartSchema = require('./cartSchema');


module.exports = mongoose.model('Cart-demo', cartSchema);