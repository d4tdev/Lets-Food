const product = require('../models/Product')

const createProduct = (newName,newPrice,newdescription,newImage,newCategory)=>{
    return product.create({
        name: newName,
        price: newPrice,
        description: newDescription,
        image: newImage,
        category: newCategory
    })
}

const deleteProdtuct = (productId) =>{
    return product.deleteone({_id: productId})
}

module.exports = {createProduct, deleteProdtuct}