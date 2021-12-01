const Product = require('../models/product.model');
const cloudinary = require('cloudinary').v2
const sharp = require('sharp')
const fs = require('fs');

/************cloudinary config*************/
cloudinary.config({
    cloud_name: 'elgaml',
    api_key: '244546732799958',
    api_secret: 'xBq1hpJhRHQHsGNGytgPbNF0hj0'
});
/************cloudinary config*************/

const cloudinaryImageUploadMethod = async file => {
    return new Promise(resolve => {
        cloudinary.uploader.upload( file , (err, res) => {
            if (err) return res.status(500).send("upload image error")
                resolve({
                    res: res.url
            }) 
        }
        ) 
    })
}


/****************** start add product ********************/
let addProduct = async (req, res) => {
    try {
        const files = req.files;
        let product = new Product(req.body);
        let images = []
        
        for(const file of files){
            const newFileName = `${Date.now()}-${file.originalname}`;
            const path = `public/images/${newFileName}`;
            await sharp(file.buffer)
                .webp({
                    quality: 40,
                }).toFile(path);
            const newPath = await cloudinaryImageUploadMethod(path);
            images.push(newPath.res)
            fs.unlinkSync(path)
        }

        product.images = images;
        await product.save();
        res.status(200).json(product); 
    } catch (error) {
        res.status(405).json({ error: "method not allowed!" })
    }
}
/****************** end add product ********************/



/****************** start delete product ********************/
let deleteProduct = (req, res) => {
    try {
        Product.findByIdAndDelete(req.params.id, (err, result) => {
            if(err) return res.send(err);
            res.send(result)
        })
    } catch (error) {
        res.json(error)
    }
}
/****************** end delete product ********************/


module.exports = {
    addProduct,
    deleteProduct
}