const Notification = require('./model/Notification');
const Like = require('./model/Like');
const Comment = require('./model/Comment');
const Post = require('./model/Post');
const User = require('./model/User');

exports.likeStream = (io) => {
  const changeLikeStream = Like.watch({ fullDocument: 'updateLookup' });
  changeLikeStream.on('change', async (next) => {
    // process next document
    // console.log('new WS connection', { ...next });
    let likeNotification;
    if (next.operationType === 'insert') {
      try {
        const likedPost = await Post.findOne({
          _id: next.fullDocument.postId,
        });
        const sender = await User.findOne({ _id: next.fullDocument.user });
        likeNotification = {
          postId: next.fullDocument.postId,
          recipient: likedPost.user,
          sender: next.fullDocument.user,
          type: 'like',
          read: false,
        };

        await Notification.create(likeNotification);
      } catch (error) {
        console.error(error);
      }
    } else if (next.operationType === 'delete') {
      likeNotification = {};
    }
    // console.log('notification', likeNotification);
  });
};

exports.commentStream = (io) => {
  const changeCommentStream = Comment.watch({ fullDocument: 'updateLookup' });
  changeCommentStream.on('change', async (next) => {
    // process next document
    // console.log('new WS connection', { ...next });
    let commentNotification;
    if (next.operationType === 'insert') {
      try {
        const commentedPost = await Post.findOne({
          _id: next.fullDocument.postId,
        });
        commentNotification = {
          postId: next.fullDocument.postId,
          recipient: commentedPost.user,
          sender: next.fullDocument.user,
          type: 'comment',
          read: false,
        };

        await Notification.create(commentNotification);
      } catch (error) {
        console.error(error);
      }
    } else if (next.operationType === 'delete') {
      commentNotification = {};
    }
    // console.log('notification', commentNotification);
  });
};
