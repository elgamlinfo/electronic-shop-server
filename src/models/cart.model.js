const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
        trim: true
    },
    ProdIDs: [{
        type: String,
    }]
}, {timestamps: true})



const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart