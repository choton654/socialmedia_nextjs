import Comment from '../../model/Comment';
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

    const { text } = req.body;
    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ msg: 'no post found' });
    }

    const newComment = await new Comment({
      text,
      postId,
      user: req.user._id,
      avatar: req.user.avatar,
    }).save();

    // const updatedPost = await Post.findOneAndUpdate(
    //   { _id: postId },
    //   { $push: { comments: { text: comment.text, user: req.user._id } } },
    //   { new: true },
    // )
    //   .populate('user', '_id name avatar')
    //   .populate('comments.user', '_id name avatar')
    //   .sort({ createdAt: 'desc' });

    if (!newComment) {
      return res.status(404).json({ msg: 'faild to create comment' });
    }
    res.status(200).json(newComment);
  })
  .delete(async (req, res) => {
    const {
      query: { postId, commentId },
    } = req;

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ msg: 'no post found' });
    }
    const commentToDelete = await Comment.findOne({
      user: req.user._id,
    });

    if (!commentToDelete) {
      return res.status(404).json({ msg: 'no comments found' });
    }

    await Comment.findByIdAndDelete({ _id: commentId });

    // const updatedPost = await Post.findOneAndUpdate(
    //   { _id: postId },
    //   { $pull: { comments: { _id: comment._id, user: req.user._id } } },
    //   { new: true },
    // )
    //   .populate('user', '_id name avatar')
    //   .populate('comments.user', '_id name avatar')
    //   .sort({ createdAt: 'desc' });

    res.status(200).json({ msg: 'comment deleted' });
  });
