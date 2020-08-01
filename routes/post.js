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
  .put('/:postId/comment', authUser, async (req, res) => {
    const { postId } = req.params;
    try {
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
    } catch (error) {
      console.error(error);
    }
  })

  // like a post
  .put('/:postId/like', authUser, async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await Post.findOne({ _id: postId });

      if (!post) {
        return res.status(404).json({ msg: 'no post found' });
      }

      const likeIds = post.likes.map((id) => id.toString());
      const authUserId = req.user._id.toString();
      if (likeIds.includes(authUserId)) {
        await post.likes.pull(authUserId);
      } else {
        await post.likes.push(authUserId);
      }
      await post.save();
      res.status(200).json({ data: post, likeCounts: post.likes.length });
    } catch (error) {
      console.error(error);
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
  });

module.exports = router;
