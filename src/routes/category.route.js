const express = require('express')
const router = express.Router();
const {addCategory,updateCategory} = require('../controllers/category.control');
const auth = require("../middlewares/auth");



router.post('/category/add', auth, addCategory)
router.patch('/category/update/:id', auth, updateCategory)

module.exports = router