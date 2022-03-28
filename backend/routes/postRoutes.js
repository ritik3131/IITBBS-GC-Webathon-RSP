const express = require("express");
const post = require("../model/Posts");
const router = new express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const {
  getAllPost,
  getOnePost,
  createPost,
  vote,
  toggleBlackListPost,
  deletePost,
} = require("../controller/postController");
const { /*ensureAuth,*/ isAdmin } = require("../middleware/auth");

router.get("/", /*ensureAuth,*/ getAllPost);

router.get("/currentPost/:postId", /*ensureAuth,*/ getOnePost);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("Images cb ", req, file);
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        req.user._id +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  )
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");

router.post("/", upload, /*ensureAuth,*/ createPost);

router.patch("/blackList", /*ensureAuth, isAdmin,*/ toggleBlackListPost);

router.patch("/vote", vote);

router.delete("/:postId", /*ensureAuth,*/ deletePost);
module.exports = router;
