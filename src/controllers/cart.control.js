const Cart = require('../models/cart.model');
const User = require('../models/user.model');

/***************start add cart****************/
let addCart = (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if(err) return res.send(err)
        if(!user.cartId) {
            let cart = new Cart({userId: req.user._id});
            cart.ProdIDs.push(req.body.prodId)
            user.cartId = cart._id;
            user.save();
            cart.save();
            return res.send({cart, user})
        }
        Cart.findById(user.cartId, (err, cartDoc) => {
            if(err) return res.send(err)
            cartDoc.ProdIDs.push(req.body.prodId)
            cartDoc.save();
            res.send(cartDoc);
        })
    })
}
/***************end  add cart****************/


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
    deleteProdCart,
    deleteAllProdCart,
}