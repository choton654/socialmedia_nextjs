const router = require('express').Router();
const Post = require('../model/Post');
const Like = require('../model/Like');
const { authUser } = require('../utils/authUser');
const Comment = require('../model/Comment');
const Notification = require('../model/Notification');
const { default: isEmpty } = require('validator/lib/isempty');

router

  // get a single post
  .get('/:id', async (req, res) => {
    try {
      let postData = {};

      const post = await Post.findOne({ _id: req.params.id })
        .populate({ path: 'user', select: 'name avatar' })
        .populate('comments')
        .populate('likes');
      if (!post) {
        return res.status(404).json({ msg: 'no post found' });
      }
      postData = post;
      postData.comments = [];
      const comments = await Comment.find({ postId: req.params.id }).populate({
        path: 'user',
        select: 'name',
      });
      comments.forEach((comment) => postData.comments.push(comment));
      return res.status(200).json(postData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.code });
    }
  })

  // delete a post
  .delete('/:id', authUser, async (req, res) => {
    const { id } = req.params;

    try {
      const postToDelete = await Post.findOne({ user: req.user._id });
      if (!postToDelete) {
        return res
          .status(400)
          .json({ msg: 'you have no permission to delete this post' });
      }
      await Post.findByIdAndDelete({ _id: id });
      await Comment.remove({ postId: { $in: id } });
      await Like.remove({ postId: { $in: id } });
      await Notification.remove({ postId: { $in: id } });
      res.status(200).json({ msg: 'post deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'failed to delete post' });
    }
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
  })

  // add comment to post
  .post('/:postId/comment', authUser, async (req, res) => {
    const { postId } = req.params;
    if (isEmpty(req.body.text)) {
      return res.status(400).json({ msg: 'text is required' });
    }
    try {
      const { text } = req.body;
      const post = await Post.findOne({ _id: postId });

      if (!post) {
        return res.status(404).json({ msg: 'no post found' });
      }

      const newComment = await new Comment({
        text: text.trim(),
        postId,
        user: req.user._id,
        avatar: req.user.avatar,
      }).save();

      // if (!newComment) {
      //   return res.status(404).json({ msg: 'faild to create comment' });
      // }
      res.status(200).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.code });
    }
  })

  // like or unlike post
  .put('/:postId/like-unlike', authUser, async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await Post.findOne({ _id: postId });

      if (!post) {
        return res.status(404).json({ msg: 'no post found' });
      }

      const like = await Like.findOne({ user: req.user._id, postId });

      if (like) {
        await like.remove();
      } else {
        await new Like({
          postId,
          user: req.user._id,
        }).save();
      }

      const likedPost = await Post.findOne({ _id: postId }).populate('likes');

      res.status(200).json(likedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.code });
    }
  })

  // get all posts
  .get('/', async (req, res) => {
    const posts = await Post.find()
      .populate({
        path: 'user',
        model: 'User',
        select: '_id name avatar',
      })
      .populate('comments')
      .populate('likes');
    if (posts.length === 0) {
      return res.status(404).json({ msg: 'no post created' });
    }

    res.status(200).json(posts);
    // return app.render(req, res, '/about', { posts });
  })

  // create a post
  .post('/', authUser, async (req, res) => {
    req.body.user = req.user;
    if (isEmpty(req.body.title)) {
      return res.status(400).json({ msg: 'title is required' });
    }
    try {
      const post = await Post.create(req.body);
      if (!post) {
        return res.status(404).json({ error: 'no post created' });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.code });
    }
  });

module.exports = router;
