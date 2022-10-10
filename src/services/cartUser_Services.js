const cartUser = require('../models/CartUser')
const Cart = require('../models/Cart')

const createCart = (newUserId, newCartId) =>{

    return Cart.findOne({_id: newUserId})
    .then((data) =>{
        return data
    })
    .then((data) =>{
        cartUser.create({
            userId: newUserId,
            cartId: newCartId,
            carts: carts.push({productId: data.productId, 
                products:{
                    name: data.products.name,
                    price: data.products.price,
                    description: data.products.description,
                    image: data.products.image,
                    category: data.products.category
                },
                quantity: data.quantity})
        })
    })
    
    // return cartUs.carts.push({ productId: newProductId, quantity: newQuantity})
}


module.exports = {createCart}