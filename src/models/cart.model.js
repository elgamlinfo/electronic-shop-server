const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
        trim: true
    },
    ProdIDs: [{
        type: String,
    }]
})



const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart