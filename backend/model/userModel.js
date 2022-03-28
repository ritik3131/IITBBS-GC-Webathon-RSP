const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  mailId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Invalid usertype',
    },
    default: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  blackList: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'view',
  },
  tokens: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('user', UserSchema);
