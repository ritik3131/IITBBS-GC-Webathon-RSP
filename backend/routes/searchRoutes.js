const express = require("express");
const post = require("../model/Posts");
const router = new express.Router();
const mongoose = require("mongoose");
const { ensureAuth } = require("../middleware/auth");

router.get("/",async (req, res) => {
    try {
      let sortby = { updatedAt: -1 };
      let searchkey=req.query.searchkey.trim().replace('+',' ');
      //query string should not have spaces,replace spaces with + while calling from frontend.
      let showBlacklist = { blacklist: "false" };
      if (req.session.isAdmin) showBlacklist = {};
      if (req.query.sortby == "upvotes") sortby = { upvotes: -1 };
      const posts = await post
        .find({$text:{$search:searchkey},showBlacklist})
        .sort(sortby)
        .populate("userid")
        .exec();
      res.status(200).json(posts);
    } catch (err) {
      res.status(400).send();
    }
  });

  module.exports=router;