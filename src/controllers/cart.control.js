const Cart = require('../models/cart.model');
const User = require('../models/user.model');

/***************start add cart****************/
let addCart = (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if(err) return res.status(500).send(err)
        if(!user.cartId) {
            let cart = new Cart({userId: req.user._id, ...req.body});

            user.cartId = cart._id;
            user.save();
            cart.save();
            return res.send(cart)
        }
        Cart.findByIdAndUpdate(user.cartId, req.body,(err, cartDoc) => {
            if(err) return res.send(err)
            res.json(cartDoc);
        })
    })
}
/***************end  add cart****************/


let getUserCart = (req, res) => {
    Cart.find({userId: req.user._id}, (err, cart) => {
        if(err) return res.status(500).send(err)
        res.json(cart)
    })
}

/****************start delete product from cart***************/
let deleteProdCart = (req, res) => {
    Cart.findById(req.user.cartId, (err, cart) => {
        if(err) return res.send(err)
        cart.ProdIDs = cart.ProdIDs.filter(id => id !== req.params.prodID)
        cart.save().then(cartRes => {
            res.send(cartRes);
        }).catch(e => {
            res.send(e)
        })
    })
}
/****************end delete product from cart***************/


/****************start  delete all product from cart***************/
let deleteAllProdCart = (req, res) => {
    Cart.findById(req.user.cartId, (err, cart) => {
        if(err) return res.send(err)
        cart.ProdIDs = []
        cart.save().then(cartRes => {
            res.send(cartRes);
        }).catch(e => {
            res.send(e)
        })
    })
}
/****************end delete all product from cart***************/



module.exports = {
    addCart,
    getUserCart,
    deleteProdCart,
    deleteAllProdCart,
}