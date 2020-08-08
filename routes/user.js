const router = require('express').Router();
const { authUser } = require('../utils/authUser');
const Post = require('../model/Post');
const User = require('../model/User');
const mongoose = require('mongoose');
const Notification = require('../model/Notification');
const isEmpty = require('validator/lib/isEmpty');
const Like = require('../model/Like');
const path = require('path');

router

  // get any user details
  .get('/:id', async (req, res) => {
    try {
      let userData = {};

      const user = await User.findOne({ _id: req.params.id });

      if (user) {
        userData.user = user;
      } else {
        return res.status(404).json({ msg: 'no user found' });
      }
      userData.posts = [];
      const posts = await Post.find({ user: req.params.id })
        .populate('comments')
        .populate('likes')
        .populate('user');
      posts.forEach((post) =>
        userData.posts.push({
          title: post.title,
          createdAt: post.createdAt,
          userHandle: post.userHandle,
          avatar: post.user.avatar,
          likeCount: post.likes,
          commentCount: post.comments,
          postId: post._id,
        }),
      );
      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.code });
    }
  })

  // posts by user
  .get('/:id/post', async (req, res) => {
    const { id } = req.params;

    try {
      const post = await Post.find({
        user: mongoose.Types.ObjectId(id),
      })
        .sort({ createdAt: 'desc' })
        .populate('comments');

      if (!post) {
        return res.status(404).json({ msg: 'no post found' });
      }
      const userPost = post.map((post) => ({
        ...post._doc,
        likeCount: post._doc.likes.length,
        commentCount: userComments.length,
      }));

      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.code });
    }
  })

  //  get own user details
  .get('/', authUser, async (req, res) => {
    try {
      let userData = {};
      const user = await User.findOne({ _id: req.user._id });
      if (user) {
        userData.credential = user;
      }
      userData.likes = [];
      const likes = await Like.find({ user: req.user._id });
      likes.forEach((like) => userData.likes.push(like));
      userData.notifications = [];
      const notifications = await Notification.find({
        recipient: req.user._id,
      }).limit(10);
      notifications.forEach((data) =>
        userData.notifications.push({
          recipient: data.recipient,
          sender: data.sender,
          createdAt: data.createdAt,
          screamId: data.screamId,
          type: data.type,
          read: data.read,
          notificationId: data._id,
        }),
      );
      return res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.code });
    }
  })

  // add user details
  .put('/', authUser, async (req, res) => {
    let userDetails = {};
    const { bio, website, location } = req.body;
    try {
      if (!isEmpty(bio.trim())) userDetails.bio = bio;
      if (!isEmpty(website.trim())) {
        // https://website.com
        if (website.trim().substring(0, 4) !== 'http') {
          userDetails.website = `http://${website.trim()}`;
        } else userDetails.website = website;
      }
      if (!isEmpty(location.trim())) userDetails.location = location;

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        userDetails,
        {
          new: true,
          runValidators: true,
        },
      );
      res
        .status(200)
        .json({ msg: 'Details added successfully', data: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.code });
    }
  })

  //  upload image
  .put('/image', authUser, async (req, res) => {
    if (!req.files) {
      return res.status(400).json({
        success: false,
        err: 'please upload a file',
      });
    }
    const file = req.files.file;

    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        err: 'please upload a image file',
      });
    }
    console.log(req.files);

    file.name = `photo_${req.user._id}${path.parse(file.name).ext}`;

    file.mv(
      `./public/static/uploads/${req.user.name}-${file.name}`,
      async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            err: 'problem with file upload',
          });
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user._id },
          { avatar: `/static/uploads/${req.user.name}-${file.name}` },
          { new: true },
        );
        res
          .status(200)
          .json({ msg: 'image uploaded successfully', data: updatedUser });
      },
    );
  })

  // mark notifications read
  .put('/notifications', authUser, (req, res) => {
    try {
      req.body.forEach(async (id) => {
        const notification = await Notification.findOne({ _id: id });
        if (!notification) {
          return res.status(400).json({ msg: 'no notification found' });
        }
        await Notification.findByIdAndUpdate(
          { _id: id },
          { read: true },
          { new: true },
        );
      });
      res.status(200).json({ msg: 'Notifications marked read' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.code });
    }
  });

module.exports = router;
