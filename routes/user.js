const router = require('express').Router();
const { authUser } = require('../utils/authUser');
const Post = require('../model/Post');
const User = require('../model/User');
const mongoose = require('mongoose');
const Comment = require('../model/Comment');
const path = require('path');

router

  // get single user
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(404).json({ msg: 'no user found' });
      }
      res.status(200).json(user);
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
          { avatar: file.name },
        );
        res
          .status(200)
          .json({ msg: 'image uploaded successfully', data: file.name });
      },
    );
  });

module.exports = router;
