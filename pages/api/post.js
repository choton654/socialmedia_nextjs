import Post from '../../model/Post';
import connectDb from '../../utils/connectDb';
import handler from '../../utils/handler';
connectDb();
export default handler.get(async (req, res) => {
  console.log('single post route');
  const {
    query: { id },
  } = req;

  const post = await Post.findOne({ _id: id });
  if (!post) {
    return res.status(404).json({ msg: 'no post found' });
  }
  res.status(200).json(post);
});
