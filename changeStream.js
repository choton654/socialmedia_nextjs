const Notification = require('./model/Notification');
const Like = require('./model/Like');
const Comment = require('./model/Comment');
const Post = require('./model/Post');

exports.likeStream = (io) => {
  const changeLikeStream = Like.watch({ fullDocument: 'updateLookup' });
  changeLikeStream.on('change', (next) => {
    // process next document
    console.log('new WS connection', { ...next });
    io.on('connection', async (socket) => {
      let likeNotification;
      if (next.operationType === 'insert') {
        const likedPost = await Post.findOne({
          _id: next.fullDocument.postId,
        });
        likeNotification = await new Notification({
          postId: next.fullDocument.postId,
          recipient: likedPost.user,
          sender: next.fullDocument.user,
          type: 'like',
          read: false,
        }).save();
      } else if (next.operationType === 'delete') {
        likeNotification = {};
      }
      console.log('notification', likeNotification);
      socket.emit('likeOnPost', { likeNotification });
    });
  });
};

exports.commentStream = (io) => {
  const changeCommentStream = Comment.watch({ fullDocument: 'updateLookup' });
  changeCommentStream.on('change', (next) => {
    // process next document
    console.log('new WS connection', { ...next });
    io.on('connection', async (socket) => {
      let commentNotification;
      if (next.operationType === 'insert') {
        const commentedPost = await Post.findOne({
          _id: next.fullDocument.postId,
        });
        commentNotification = await new Notification({
          postId: next.fullDocument.postId,
          recipient: commentedPost.user,
          sender: next.fullDocument.user,
          type: 'comment',
          read: false,
        }).save();
      } else if (next.operationType === 'delete') {
        commentNotification = {};
      }
      console.log('notification', commentNotification);
      socket.emit('commentOnPost', { commentNotification });
    });
  });
};
