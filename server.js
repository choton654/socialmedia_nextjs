const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const fileUpload = require('express-fileupload');

const postRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const connectDb = require('./utils/connectDb');
require('dotenv').config();

connectDb();

app.prepare().then(() => {
  const server = express();

  server.use(express.json({ extended: false }));
  server.use(fileUpload());

  server.use('/api/v1/post', postRoute);
  server.use('/api/v1/auth', authRoute);
  server.use('/api/v1/user', userRoute);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
