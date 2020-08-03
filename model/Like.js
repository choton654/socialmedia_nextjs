const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const LikeSchema = new mongoose.Schema({
  postId: {
    type: ObjectId,
    ref: 'Post',
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
});

LikeSchema.index({ postId: 1, user: 1 }, { unique: true });

const Like = mongoose.models.Like || mongoose.model('Like', LikeSchema);

module.exports = Like;
