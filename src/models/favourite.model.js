const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    userId:{
        type: String,
        trim: true
    },
    ProdIDs: [{
        type: String,
    }]
}, {timestamps: true})



const Favourite = mongoose.model("Favourite", favouriteSchema);
module.exports = Favourite