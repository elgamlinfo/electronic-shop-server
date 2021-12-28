const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
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




/************start user register*************/
let userRegister = (req, res) => {
    //find user
    User.findOne({email: req.body.email}, (err, user) => {
        if(user) {
            return res.status(409).json({message: 'this email is registerd!'})
        }
        //hash password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            //create user
            const userData = new User({ 
                ...req.body,
                _id: new mongoose.Types.ObjectId(),
                password: hash
            });
            //save user to db
            userData.save().then(() => {
                res.status(200).json(userData)
            })
        })
    })
}
/************end user register*************/



/************start user img uplouder*************/
let userImgupload = async (req, res) => {
    try {
        let user = req.user;
        const newFileName = `${Date.now()}-${req.file.originalname}`;
        const path  = `public/images/${newFileName}`;
        await sharp(req.file.buffer)
            .resize({ width: 600, height: 600 })
            .webp({
                quality: 90,
            }).toFile(path);
        await cloudinary.uploader.upload(path,async function(error, result) {
            if (error) {
                console.log(error);
            }
            fs.unlinkSync(path)
            user.img  = result.url;
            user.save();
            res.send(user);
        });
    } catch (error) {
        console.log(error);
    }
}
/************end user img uplouder*************/


/************start update user information*************/
let userInfoUpdate = (req, res) => {
    let objKeys = Object.keys(req.body);
    let validKeys = ["name", "email", "password", "mobile", "address"]
    let isValid = objKeys.every(key => validKeys.includes(key))
    if(!isValid) {
        return res.send('invalid credentials');
    }
    User.findById(req.user._id, (err, user) =>{
        if(err) return res.send(err);

        objKeys.forEach((key) => {
            user[key] = req.body[key];
        });
        user.save()
        .then((userData) => {
            res.send(userData);
        })
        .catch(err => {
            res.send(err);
        })
    })
}
/************end update user information*************/



/************start user Login*************/
let userLogin =  (req, res) => {
    //find user
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.status(404).json({message: "user not found!"})
        }
        //unhash password
        bcrypt.compare(req.body.password, user.password, async(err, result) => {
            if(result){
                //generate token
                const accessToken = await jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET_KEY);
                user.tokens = user.tokens.concat({token: accessToken});
                //save token
                user.save().then(() => {
                    res.cookie("access_token", `Bearer ${accessToken}`)
                    res.json({user, token:accessToken})
                });
                return;
            }
            res.status(203).json({message: 'password not match!'})
        });
    })
}
/************end user Login*************/

/*******************start get user*********************/
let getUser = (req, res) => {
    try {
        res.json(req.user);
        
    } catch (error) {
        res.status(500).json({error})
    }
}
/*******************end get user*********************/

/************start deleting user**************/
let deleteUser = (req, res) => {
    User.findByIdAndRemove(req.user._id, (err, user) => {
        if(err) return res.send(err)
        res.send(user);
    })
}
/************end deleting user**************/



/************start user logout**********/
let userLogout = (req, res) => {
    let user = req.user;
    user.tokens = user.tokens.filter(token => token.token != req.token)
    user.save().then(() => {
        res.status(200).json({"message":"logout Success"})
    })
}
/************end user logout**********/


module.exports = {
    userRegister,
    userImgupload,
    userInfoUpdate,
    userLogin,
    getUser,
    deleteUser,
    userLogout
}