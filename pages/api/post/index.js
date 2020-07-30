import Post from '../../../model/Post';
import { authUser } from '../../../utils/authUser';
import connectDb from '../../../utils/connectDb';
import handler from '../../../utils/handler';
connectDb();
export default handler
  .get(async (req, res) => {
    const {
      query: { id },
    } = req;

    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(404).json({ msg: 'no post found' });
    }
    res.status(200).json(post);
  })
  .get(async (req, res) => {
    const posts = await Post.find().populate({
      path: 'user',
      model: 'User',
      select: '_id name avatar',
    });
    if (posts.length === 0) {
      return res.status(404).json({ msg: 'no post created' });
    }
    res.status(200).json(posts);
  })
  .use(authUser)
  .post(async (req, res) => {
    req.body.user = req.user;

    const post = await Post.create(req.body);
    if (!post) {
      return res.status(404).json({ error: 'no post created' });
    }
    res.status(200).json(post);
  });
