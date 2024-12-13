const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    gameName:{
        required:true,
        type:String
    },
    gamePrice:{
        required:true,
        type:Number
    },
    description:{
        required:true,
        type:String
    },
    gameGenre:{
        required:true,
        type:String
    },
    gameImage:{
        required:true,
        type:String
    }
})

const ProductModel = mongoose.model('ProductModel',ProductSchema)
module.exports = ProductModel