const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    age:{
        type:Number
    },
    gender:String,
    profilePicture:String,
    role:{
        type:String,
        default:0
    }
})
const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel