import mongoose from 'mongoose';
import Post from '../../../model/Post';
import connectDb from '../../../utils/connectDb';
import handler from '../../../utils/handler';
connectDb();
export default handler.get(async (req, res) => {
  const {
    query: { userId },
  } = req;
  try {
    console.log(userId);
    const post = await Post.find({
      user: mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: 'desc' });

    if (!post) {
      return res.status(404).json({ msg: 'no post found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code });
  }
});
