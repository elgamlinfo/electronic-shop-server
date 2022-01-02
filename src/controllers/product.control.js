const Product = require("../models/product.model");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const fs = require("fs");

/************cloudinary config*************/
cloudinary.config({
    cloud_name: "elgaml",
    api_key: "244546732799958",
    api_secret: "xBq1hpJhRHQHsGNGytgPbNF0hj0",
});
/************cloudinary config*************/

const cloudinaryImageUploadMethod = async (file) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(file, (err, res) => {
            if (err) return res.status(500).send("upload image error");
            resolve({
                res: res.url,
            });
        });
    });
};

/****************** start add product ********************/
let addProduct = async (req, res) => {
    try {
        const files = req.files;
        let product = new Product(req.body);
        let images = [];
        for (const file of files) {
            const newFileName = `${Date.now()}-${file.originalname}`;
            const path = `public/images/${newFileName}`;
            await sharp(file.buffer)
            .webp({
                quality: 40,
            })
            .toFile(path);
            const newPath = await cloudinaryImageUploadMethod(path);
            images.push(newPath.res);
            fs.unlinkSync(path);
        }
        
        product.specifications = req.body.specifications.split("\n");
        product.images = images;
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(405).json({ error: "method not allowed!" });
    }
};
/****************** end add product ********************/

/*******************start get products********************/
let getProducts = (req, res) => {
    const title = new RegExp(req.query.search, 'i');
    Product.find({$or:[{title},{category: title}]})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
/*******************end get products********************/

/*******************start get products count********************/
let getProductsCount = async (req, res) => {
    try {
        let productCount = await Product.find({}).count();
        res.json({count: productCount});
    } catch (error) {
        res.send(error)
    }
};
/*******************end get products count********************/

/*******************start get product by id********************/
let getProductById = (req, res) => {
    Product.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
/*******************end get product by id********************/

/****************** start delete product ********************/
let deleteProduct = (req, res) => {
    try {
        Product.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) return res.json(err);
            if (!result) return res.json({ message: "Product Not Found!" });
            res.send({ message: "Deleted!" });
        });
    } catch (error) {
        res.json({ message: "Product Not Found!" });
    }
};
/****************** end delete product ********************/

module.exports = {
    addProduct,
    getProducts,
    getProductsCount,
    getProductById,
    deleteProduct,
};
