const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    qnt: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    products: [{
        title: {
            type: String,
            required: true
        },
        prodId: {
            type: String
        },
        company: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        qnt: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
    }]
}, {timestamps: true})



const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart