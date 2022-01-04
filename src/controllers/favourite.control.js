const User = require('../models/user.model');
const Product = require('../models/product.model');
const Favourite = require('../models/favourite.model');
const mongoose = require('mongoose')


/***************start add favourite****************/
let addFavourite = (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if(err) return res.send(err)
        if(!user.favouriteId) {
            let favourite = new Favourite({userId: req.user._id});
            favourite.ProdIDs.push(req.body.prodId)
            user.favouriteId = favourite._id;
            user.save();
            favourite.save();
            return res.send({favourite, user})
        }
        Favourite.findById(user.favouriteId, (err, favouriteDoc) => {
            if(err) return res.send(err)
            favouriteDoc.ProdIDs.push(req.body.prodId)
            favouriteDoc.save();
            res.send(favouriteDoc);
        })
    })
}
/***************end  add favourite****************/



/***************start  get favourite****************/
let getFavourite = (req, res) => {
    Favourite.findById(req.user.favouriteId, (err, favourite) =>{
        if(err) res.status(401).json({error: err.message});
        
        Product.find({"_id":{$in: favourite.ProdIDs}})
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json({error: error.message});
        })
    })
}
/***************end  get favourite****************/


/***************start  delete favourite****************/
let deletFromFav = (req, res) => {
    Favourite.findById(req.user.favouriteId, (err, favourite) =>{
        if(err) res.status(401).json({error: err.message});
        favourite.ProdIDs = favourite.ProdIDs.filter(id => id !== req.params.id)
        favourite.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json({error: error.message});
        })
    })
}
/***************end  delete favourite****************/




module.exports = {
    addFavourite,
    getFavourite,
    deletFromFav
}