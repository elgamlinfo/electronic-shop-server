const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    _id:{
        type:String,
        trim: true
    },
    name:{
        type:String,
        trim: true
    },
    email:{
        type:String,
        trim: true
    },
    password:{
        type:String,
        trim: true
    },
    img:{
        type:String,
        trim: true
    },
    address:{
        type:String,
        trim: true
    },
    mobile:{
        type:String,
        trim: true
    },
    cartId: {
        type:String,
        trim: true
    },
    tokens: [
		{
			token: {
				type: String,
				require: true,
			},
		},
	],
}) 


const User = mongoose.model('User', userSchema)
module.exports = User