const express = require("express");
const reply = require("../model/Replies");
const user = require("../model/userModel");
const post = require("../model/Posts");
const router = new express.Router();
const { ensureAuth, isAdmin } = require("../middleware/auth");
router.patch("/blacklist", ensureAuth, isAdmin, async (req, res) => {
  try {
    const userid = req.body.userId;
    const change = { blackList: !req.body.blacklist };
    await user.findByIdAndUpdate(userid, change);
    await post.updateMany({ userid: userid }, { blacklist: !req.body.blacklist});
    await reply.updateMany({ userid: userid }, change);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});
router.patch("/togglepin",ensureAuth,async(req,res)=>{
  try{
    const toggleuser=req.body.userId;
    const index=req.user.pinned.indexOf(toggleuser);
    if(index===-1)
      req.user.pinned.push(toggleuser);
    else
      req.user.pinned.splice(index,1);
    const pinned=req.user.pinned; 
    await req.user.save();
    await user.findByIdAndUpdate(req.user._id,{pinned:pinned});
    res.send();
  }
  catch(e){
    res.status(400).send();
  }
});
module.exports = router;
