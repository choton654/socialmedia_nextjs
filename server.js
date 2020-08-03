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
require('dotenv').config();

connectDb();

app.prepare().then(() => {
  const server = express();
  const { httpServer, io } = creeateserver(server);

  const changeStream = Post.watch({ fullDocument: 'updateLookup' });
  changeStream.on('change', (next) => {
    // process next document
    io.on('connection', (socket) => {
      console.log('new WS connection');
      console.log('it changed', next);
      socket.emit('dbChange', { ...next.fullDocument });
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
