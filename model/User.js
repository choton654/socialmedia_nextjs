import mongoose from 'mongoose';

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
  },
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
