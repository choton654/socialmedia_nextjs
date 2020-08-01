import Post from '../../model/Post';
import { authUser } from '../../utils/authUser';
import connectDb from '../../utils/connectDb';
import handler from '../../utils/handler';
connectDb();
export default handler.use(authUser).put(async (req, res) => {
  const {
    query: { postId },
  } = req;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    return res.status(404).json({ msg: 'no post found' });
  }

  const likeIds = post.likes.map((id) => id);
  const authUserId = req.user._id;
  if (likeIds.includes(authUserId)) {
    await post.likes.pull(authUserId);
  } else {
    await post.likes.push(authUserId);
  }
  await post.save();
  res.status(200).json({ data: post, likeCounts: post.likes.length });
});
