import Like from '../../model/Like';
import Post from '../../model/Post';
import { authUser } from '../../utils/authUser';
import connectDb from '../../utils/connectDb';
import handler from '../../utils/handler';
connectDb();
export default handler
  .use(authUser)
  .put(async (req, res) => {
    const {
      query: { postId },
    } = req;

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ msg: 'no post found' });
    }

    const likeIds = post.likes.map((id) => id);
    const authUserId = req.user._id;
    console.log(likeIds, authUserId);
    if (likeIds.includes(authUserId)) {
      await post.likes.pull(authUserId);
    } else {
      await post.likes.push(authUserId);
    }
    await post.save();
    res.status(200).json(post);
    //  res.json(post);
    // const newLike = await new Like({
    //   postId,
    //   user: req.user._id,
    // }).save();

    // if (!newLike) {
    //   return res.status(404).json({ msg: 'faild to create like' });
    // }
  })
  .delete(async (req, res) => {
    const {
      query: { postId },
    } = req;

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ msg: 'no post found' });
    }

    await Like.findByIdAndDelete({ user: req.user._id });

    res.status(200).json({ msg: 'post unlike successfull' });
  });
