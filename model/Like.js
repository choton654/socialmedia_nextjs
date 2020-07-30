import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const LikeSchema = new mongoose.Schema(
  {
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Like = mongoose.models.Like || mongoose.model('Like', LikeSchema);

export default Like;
