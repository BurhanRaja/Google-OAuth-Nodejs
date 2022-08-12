const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    googleId:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema)