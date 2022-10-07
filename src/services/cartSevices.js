const cart = require('../models/Cart')

const createCart = (newProductId,newQuantity) => {
    return cart.create({
        productId: newProductId,
        quantity: newQuantity
    })
}

module.exports = {createCart}