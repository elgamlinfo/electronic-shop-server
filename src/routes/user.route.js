const express = require("express");
const router = express.Router();
const {
    userRegister,
    userImgupload,
    userInfoUpdate,
    userLogin,
    getUser,
    deleteUser,
    userLogout,
} = require("../controllers/user.control");
const auth = require("../middlewares/auth");
const multer = require("multer");

////***********init multer to upload images***********////
const uploud = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg|webp)$/)) {
            return cb(new Error("image sould be jpg, png, webp or jpeg"));
        }
        cb(undefined, true);
    },
});

/********************user register*********************/
router.post("/user/register", userRegister);

/********************user image upload*********************/
router.post("/user/img/upload", auth, uploud.single("avatar"), userImgupload);

/********************user update information*********************/
router.patch("/user/info", auth, userInfoUpdate);

/********************user login*********************/
router.post("/user/login", userLogin);

/********************get user*********************/
router.get("/user", auth, getUser);

/********************use delete profile*********************/
router.delete("/user/delete", auth, deleteUser);

/********************user logout*********************/
router.post("/user/logout", auth, userLogout);

module.exports = router;
