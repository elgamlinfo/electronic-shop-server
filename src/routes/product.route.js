const express = require('express');
const router = express.Router();
const {addProduct, deleteProduct} = require('../controllers/product.control');
const auth = require("../middlewares/auth");
const multer = require("multer");


////***********init multer to upload images***********////
const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg|webp)$/)) {
            return cb(new Error("image sould be jpg, png, webp or jpeg"));
        }
        cb(undefined, true);
    },
});

/***************************add new product*******************************/
router.post('/product/add', auth, upload.array('photos', 12), addProduct)


/*************************delete product***************************/
router.delete('/product/:id', auth, deleteProduct)


module.exports = router