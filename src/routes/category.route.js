const express = require("express");
const router = express.Router();
const {
    addCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/category.control");
const auth = require("../middlewares/auth");

/*************************add category***************************/
router.post("/category/add", auth, addCategory);

/*************************update category********************************/
router.patch("/category/update/:id", auth, updateCategory);

/****************************delete category*******************************/
router.delete("/category/delete/:id", auth, deleteCategory);

module.exports = router;
