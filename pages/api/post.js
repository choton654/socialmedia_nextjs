import Post from '../../model/Post';
import { authUser } from '../../utils/authUser';
import connectDb from '../../utils/connectDb';
import handler from '../../utils/handler';
connectDb();
export default handler
  .get(async (req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts);
  })
  .use(authUser)
  .post(async (req, res) => {
    const { title } = req.body;
    req.body.user = req.user;

    const post = await Post.create(req.body);
    if (!post) {
      return res.status(404).json({ error: 'no post created' });
    }
    res.status(200).json(post);
  });
