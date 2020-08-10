const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      default: '/static/images/profile-image.jpg',
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});
UserSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
