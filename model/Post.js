const mongoose = require('mongoose');
const { post } = require('../routes/post');
const { ObjectId } = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  count: true,
});
PostSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'postId',
  count: true,
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

module.exports = Post;
