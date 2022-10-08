const cartUser = require('../models/CartUser')

const createCart = (newUserId,newCartId) =>{
    return cartUser.findOne({
        userId: newUserId
    })
    .then((data) =>{
        if(data){
           cartUser.insertMany({
            userId: newUserId,
            cartId: newCartId
           })
        }
        else{
            cartUser.create({
                userId: newUserId,
                cartId: newCartId
            })
        }
    })
}




// const updateCart = (userId, newProductId, newQuantity) =>{
//     return cart.
// }

module.exports = {createCart}