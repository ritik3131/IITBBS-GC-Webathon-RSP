const postModel = require('../model/Posts');
const replyModel = require('../model/Replies');
const mongoose = require('mongoose');

const getAllPost = async (req, res) => {
  try {
    //?sort=hot
    let sortby = { createdAt: -1 };
    if (req.query.sort == 'hot') sortby = { noupvotes: -1};
    let showBlacklist = { blacklist: 'false' };
    if (req.session.isAdmin) showBlacklist = {};
    const posts = await postModel
    .find(showBlacklist)
    .sort(sortby)
    .populate('userid')
    .exec();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const getOnePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    let sortby = { upvotes: -1 };
    let showBlacklist = { blackList: 'false' };
    if (req.session.isAdmin) showBlacklist = {};
    const post = await postModel.findById(postId).populate('userid');
    const replies = await replyModel
      .find({ postid: postId, showBlacklist })
      .sort(sortby);
    res.status(200).json({ post, replies });
  } catch (err) {
    res.status(400).send();
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new postModel({
      username: req.user.name,
      content: req.body.content,
      userid: mongoose.Types.ObjectId(req.user._id),
    });
    await newPost.save();
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const toggleBlackListPost = async (req, res) => {
  try {
    const change = { blacklist: !req.body.blacklist };
    const postId = req.body.postId;
    await postModel.findByIdAndUpdate(postId, change);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId.trim();
    const post = await postModel.findById(postId);
    if (req.user._id.toString() === post.userid.toString())
      return await post.delete();
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
};

const vote = async (req, res) => {
  // request body {
  //   upvote:Boolean  // If someone wants to upvote this will be true if downvote then false
  //   postId:
  //   userId
  // }
  try {
    const up = req.body.upvote;
    const postId = req.body.postId;
    const userId = req.body.userId;
    // const userId = req.user._id
    try {
      const post = await postModel.findById(postId);
      let downvoters = post.downvotes;
      let upvoters = post.upvotes;
      if (up) {
        if (downvoters.includes(userId)) {
          const index = downvoters.indexOf(userId);
          if (index > -1) {
            downvoters.splice(index, 1);
          }
        }
        if (upvoters.includes(userId)) {
          const index = upvoters.indexOf(userId);
          if (index > -1) {
            upvoters.splice(index, 1);
          }
        } else {
          upvoters.push(userId);
        }
      } else {
        if (upvoters.includes(userId)) {
          const index = upvoters.indexOf(userId);
          if (index > -1) {
            upvoters.splice(index, 1);
          }
        }
        if (downvoters.includes(userId)) {
          const index = downvoters.indexOf(userId);
          if (index > -1) {
            downvoters.splice(index, 1);
          }
        } else {
          downvoters.push(userId);
        }
      }
      change = { downvotes: downvoters, upvotes: upvoters,noupvotes:upvoters.length };
      await postModel.findByIdAndUpdate(postId, change);
      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: 'Post does not exit',
      });
    }
  } catch (err) {
    res.status(400).send();
  }
};

module.exports = {
  getAllPost,
  getOnePost,
  vote,
  createPost,
  toggleBlackListPost,
  deletePost,
};
