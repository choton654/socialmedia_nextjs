import mongoose from 'mongoose';
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
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        user: { type: ObjectId, ref: 'User' },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const autoPopulateuser = function (next) {
  this.populate('user', '_id name avatar');
  this.populate('comments.user', '_id name avatar');
  next();
};

PostSchema.pre('findOne', autoPopulateuser).pre('find', autoPopulateuser);

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;
