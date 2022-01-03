const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    price:{
        type: Number,
        trim: true
    },
    specifications: [{
        type: String,
    }],
    images: [{
        type: String,
    }],
    company: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    }
})



const Product = mongoose.model("Product", productSchema);
module.exports = Product