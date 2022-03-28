const reply = require('../model/Replies');
const mongoose = require('mongoose');
const post = require('../model/Posts');

const getReplies = async (req, res) => {
  try {
    let sortby = { createdAt: -1 };
    if (req.query.sort == 'hot') sortby = { noUpvotes: 1, noDownvotes: -1 };
    if (req.query.sort == 'recent') sortby = { updatedAt: -1 };
    const postid = req.query.postid;
    let showBlacklist = { blacklist: 'false' };
    if (req.session.isAdmin) showBlacklist = {};
    const replies = await reply
      .find({ postid: postid, showBlacklist })
      .sort(sortby);
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).send();
  }
};

const createReply = async (req, res) => {
  const postId = req.body.postId.trim();
  try {
    const replyPost = await post.findById(postId);
    if (replyPost) {
      const newreply = new reply({
        username: req.user.name,
        content: req.body.content,
        userid: mongoose.Types.ObjectId(req.user._id),
        postid: mongoose.Types.ObjectId(postId),
      });
      await newreply.save();
      replyPost.replies.push(newreply);
      await replyPost.save();
      res.status(201).send();
    } else {
      res.status(500).send();
    }
  } catch (err) {
    res.status(500).send();
  }
};

const toggleBlackListReply = async (req, res) => {
  try {
    const change = { blackList: !req.body.blacklist };
    const replyId = req.body.replyId;
    await reply.findByIdAndUpdate(replyId, change);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};

const vote = async (req, res) => {
  // request body {
  //   upvote:Boolean
  //   replyId:
  //   userId
  // }
  try {
    const up = req.body.upvote; // If someone wants to upvote this will be true if downvote then false
    const replyId = req.body.replyId;
    const userId = req.body.userId;
    // const userId = req.user._id;
    console.log(up);
    try {
      const rep = await reply.findById(replyId);
      let downvoters = rep.downvotes;
      let upvoters = rep.upvotes;
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
      change = { downvotes: downvoters, upvotes: upvoters };
      await reply.findByIdAndUpdate(replyId, change);
      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      res.status(404).send();
    }
  } catch (err) {
    res.status(400).send();
  }
};

const deleteReply = async (req, res) => {
  try {
    const replyId = req.params.replyId;
    const postId = req.params.postId;
    const del_reply = await reply.findById(replyId);

    if (req.user._id.toString() === del_reply.userid.toString()) {
      const replyPost = await post.findById(postId);
      const replyIndex = replyPost.replies.findIndex(
        (reply) => reply.toString() === replyId
      );
      if (replyIndex !== -1) {
        replyPost.replies.splice(replyIndex, 1);
        await replyPost.save();
        await del_reply.delete();
      }
    }
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
};
module.exports = {
  getReplies,
  createReply,
  toggleBlackListReply,
  vote,
  deleteReply,
};
