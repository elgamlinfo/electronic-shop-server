const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }	
    ,
    qnt: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    placed: {
        type: Boolean
    },
    transit: {
        type: Boolean
    },
    completed: {
        type: Boolean
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



const Order = mongoose.model("Order", orderSchema);
module.exports = Order