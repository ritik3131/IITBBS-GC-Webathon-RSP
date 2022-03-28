const mongoose = require('mongoose');

const reply_schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: 'true',
      validate(data) {
        if (data.match(/(fuck|sex|porn|dick|cock|cunt|pussy|asshole)/i))
          throw new Error('Abusive Language detected');
      },
    },
    upvotes: {
      type: Array,
      default: [],
    },
    downvotes: {
      type: Array,
      default: [],
    },
    postid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    blackList: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

reply_schema.virtual('noUpvotes').get(function () {
  return this.upvotes.length;
});

reply_schema.virtual('noDownvotes').get(function () {
  return this.downvotes.length;
});

const reply = mongoose.model('reply', reply_schema);

module.exports = reply;
