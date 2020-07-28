import nc from 'next-connect';
import Post from '../../model/Post';
import { authUser } from '../../utils/authUser';
import connectDb from '../../utils/connectDb';
connectDb();
export default nc({
  onError(error, req, res) {
    res.status(501).send(`something went wrong ${error}`);
  },
  onNoMatch(req, res) {
    req.status(405).send(`method ${req.method} not allowed`);
  },
})
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
      return res.status(404).send('no post created');
    }
    res.status(200).json(post);
  });
