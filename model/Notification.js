const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const NotificationSchema = new mongoose.Schema(
  {
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
    recipient: {
      type: ObjectId,
      ref: 'User',
    },
    sender: {
      type: ObjectId,
      ref: 'User',
    },
    type: 'like' | 'comment',
    read: false,
  },
  {
    timestamps: true,
  },
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
