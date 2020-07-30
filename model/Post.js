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
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;
