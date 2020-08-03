const express = require('express');
const { app, creeateserver } = require('./app');
const port = parseInt(process.env.PORT, 10) || 3000;
const handle = app.getRequestHandler();
const http = require('http');
const socketIo = require('socket.io');
const fileUpload = require('express-fileupload');
const postRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const connectDb = require('./utils/connectDb');
const Post = require('./model/Post');
const Like = require('./model/Like');
const Notification = require('./model/Notification');
const Comment = require('./model/Comment');
require('dotenv').config();

connectDb();

app.prepare().then(() => {
  const server = express();
  const { httpServer, io } = creeateserver(server);

  const changeLikeStream = Like.watch({ fullDocument: 'updateLookup' });
  changeLikeStream.on('change', (next) => {
    // process next document
    io.on('connection', async (socket) => {
      const like = await Like.findOne({
        user: next.fullDocument.user,
        postId: next.fullDocument.postId,
      });
      const likedPost = await Post.findOne({ _id: next.fullDocument.postId });
      let likeNotification;
      if (like) {
        likeNotification = {};
        return;
      } else {
        likeNotification = await new Notification({
          postId: next.fullDocument.postId,
          recipient: likedPost.user,
          sender: next.fullDocument.user,
          type: 'like',
          read: false,
        }).save();
      }
      console.log('new WS connection');
      console.log('it changed', likeNotification);
      socket.emit('likeOnPost', { likeNotification });
    });
  });

  const changeCommentStream = Comment.watch({ fullDocument: 'updateLookup' });
  changeCommentStream.on('change', (next) => {
    // process next document
    io.on('connection', async (socket) => {
      const commentedPost = await Post.findOne({
        _id: next.fullDocument.postId,
      });

      const commentNotification = await new Notification({
        postId: next.fullDocument.postId,
        recipient: commentedPost.user,
        sender: next.fullDocument.user,
        type: 'comment',
        read: false,
      }).save();
      console.log('new WS connection');
      console.log('it changed', commentNotification);
      socket.emit('commentOnPost', { commentNotification });
    });
  });

  server.use(express.json({ extended: false }));
  server.use(fileUpload());

  server.use('/api/v1/post', postRoute);
  server.use('/api/v1/auth', authRoute);
  server.use('/api/v1/user', userRoute);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
