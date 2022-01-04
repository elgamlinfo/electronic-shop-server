const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {addFavourite, getFavourite, deletFromFav}  = require('../controllers/favourite.control');



router.post('/fav/add', auth, addFavourite)


router.get('/fav', auth, getFavourite)

router.delete('/fav', auth, deletFromFav)



module.exports = router