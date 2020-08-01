const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    avatar: {
      type: String,
      default: '/static/images/profile-image.jpg',
    },
  },
  {
    timestamps: true,
  },
);

const Comment =
  mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

module.exports = Comment;
