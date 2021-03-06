const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
    addCart,
    getUserCart,
    deleteProdCart,
    deleteAllProdCart,
} = require("../controllers/cart.control");

/*********************add to cart*******************/
router.post("/cart/add", auth, addCart);


/*********************add to cart*******************/
router.get("/cart", auth, getUserCart);

/*********************delete one prod from  cart*******************/
router.delete("/cart/:prodID", auth, deleteProdCart);

/*********************delete all prod from cart*******************/
router.delete("/cart", auth, deleteAllProdCart);

module.exports = router;
