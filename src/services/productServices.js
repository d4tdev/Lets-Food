const product = require('../models/Product')

const createProduct = (newName,newPrice,newDescription,newImage,newCategory)=>{
    return product.create({
        name: newName,
        price: newPrice,
        description: newDescription,
        image: newImage,
        category: newCategory
    })
}

const deleteProduct = (productId) =>{
    return product.deleteone({_id: productId})
}

module.exports = {createProduct, deleteProduct}
