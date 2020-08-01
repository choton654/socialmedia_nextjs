const mongoose = require('mongoose');
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
    likes: [{ type: ObjectId, ref: 'User' }],
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
  justone: false,
  count: true,
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

module.exports = Post;
