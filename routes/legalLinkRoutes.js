const express= require("express");

const router= express.Router();

const {signup,login}= require("../controller/userController");
const {updateProfile}= require("../controller/profileController");
const {toogleLike} = require("../controller/likeController");
const {createPost,updatePost,deletePost,getAllPost,getOnePost} = require("../controller/postController");
const {createComment,deleteComment} = require("../controller/commentController");
const {createategory,showAllCategory} = require("../controller/categoryController");

const {getUserIdFromToken}=require("../middleware/authMiddleware");

router.post("/signup",signup);
router.post("/login",login);

router.post("/createPost",getUserIdFromToken,createPost);
router.put("/updatePost",getUserIdFromToken,updatePost);
router.delete("/deletePost",getUserIdFromToken,deletePost);
router.get("/getAllPost",getAllPost);
router.get("/getOnePost",getOnePost);

router.post("/createComment",getUserIdFromToken,createComment);
router.delete("/deleteComment",deleteComment);

router.put("/updateProfile",getUserIdFromToken,updateProfile);

router.post('/togglelike', getUserIdFromToken, toogleLike);

router.post('/createategory', createategory);
router.get("/showAllCategory",showAllCategory);




