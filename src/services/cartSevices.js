const cart = require('../models/Cart')
const Product = require('../models/Product')

const createCart = (newProductId,newQuantity) => {
     
    return Product.findById(newProductId)
    .then((data) => {
        return data
    })
    .then((data) => {
        cart.create({
            productId: newProductId,
            products:{
            name : data.name,
            price : data.price,
            description : data.description,
            image : data.image,
            category: data.category
            },
            quantity: newQuantity
        })
    })
}



const deleteCart = (id) =>{
    return Product.deleteOne({_id: id})
}

module.exports = {createCart, deleteCart}