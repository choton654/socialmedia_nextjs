import Post from '../../../model/Post';
import { authUser } from '../../../utils/authUser';
import connectDb from '../../../utils/connectDb';
import handler from '../../../utils/handler';
connectDb();
export default handler.use(authUser).put(async (req, res) => {
  const {
    query: { postId },
  } = req;

  const { text } = req.body;
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    return res.status(404).json({ msg: 'no post found' });
  }

  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: { text, user: req.user._id } } },
    { new: true },
  )
    .populate('user', '_id name avatar')
    .populate('comments.user', '_id name avatar')
    .sort({ createdAt: 'desc' });

  if (!updatedPost) {
    return res.status(404).json({ msg: 'faild to create comment' });
  }
  res.status(200).json(updatedPost);
});
