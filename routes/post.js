const router = require('express').Router();
const Post = require('../model/Post');
const { authUser } = require('../utils/authUser');
const Comment = require('../model/Comment');

router

  // get a single post
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const post = await Post.findOne({ _id: id }).populate('comments');
    if (!post) {
      return res.status(404).json({ msg: 'no post found' });
    }
    res.status(200).json(post);
  })

  // get all posts
  .get('/', async (req, res) => {
    const posts = await Post.find()
      .populate({
        path: 'user',
        model: 'User',
        select: '_id name avatar',
      })
      .populate('comments');
    if (posts.length === 0) {
      return res.status(404).json({ msg: 'no post created' });
    }
    res.status(200).json(posts);
  })

  // create a post
  .post('/', authUser, async (req, res) => {
    req.body.user = req.user;

    const post = await Post.create(req.body);
    if (!post) {
      return res.status(404).json({ error: 'no post created' });
    }

    res.status(200).json(post);
  })

  // add comment to post
  .put('/:postId/comment', authUser, async (req, res) => {
    const { postId } = req.params;

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

    const commentCount = (await Comment.find({ postId })).length;

    if (!newComment) {
      return res.status(404).json({ msg: 'faild to create comment' });
    }
    res.status(200).json({ data: newComment, commentCount });
  })

  // delete comment from post
  .delete('/:postId/comment/:commentId', authUser, async (req, res) => {
    const { postId, commentId } = req.params;
    try {
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

      res.status(200).json({ msg: 'comment deleted' });
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router;
