const express = require("express");
const router = express.Router();
const {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategories,
} = require("../controllers/category.control");
const auth = require("../middlewares/auth");

/*************************add category***************************/
router.post("/category/add", auth, addCategory);


/*************************add category***************************/
router.get("/category", getCategories);

/*************************update category********************************/
router.patch("/category/update/:id", auth, updateCategory);

/****************************delete category*******************************/
router.delete("/category/delete/:id", auth, deleteCategory);

module.exports = router;
