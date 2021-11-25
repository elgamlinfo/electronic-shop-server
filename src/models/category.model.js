const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    icon:{
        type: String,
        trim: true
    }
})



const Category = mongoose.model("Categoey", categorySchema);
module.exports = Category