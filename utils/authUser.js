import jwt from 'jsonwebtoken';
import User from '../model/User';

export async function authUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(404).json({ error: 'No Authorization token' });
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET,
  );

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ error: 'No user found' });
  }
  req.user = user;
  next();
}
