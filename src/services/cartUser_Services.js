const cartUser = require('../models/CartUser')

const createCart = (newUserId,newProductId,newQuantity) =>{
    return cartUser.create({
        userId: newUserId,
        products: [
            {
                productId: newProductId,
                quantity: newQuantity
            }
        ]
    })
}

// const updateCart = (userId, newProductId, newQuantity) =>{
//     return cart.
// }

module.exports = {createCart}