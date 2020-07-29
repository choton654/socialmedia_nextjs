import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import User from '../../model/User';
import connectDb from '../../utils/connectDb';
import handler from '../../utils/handler';
connectDb();
export default handler.post(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!isEmail(email)) {
      return res.status(404).json({ error: 'Email must be valid' });
    } else if (!isLength(name, { min: 4, max: 20 })) {
      return res
        .status(404)
        .json({ error: 'Name must be 4 to 20 letters long' });
    } else if (!isLength(password, { min: 6, max: 12 })) {
      return res
        .status(404)
        .json({ error: 'Password must be 6 to 12 letters long' });
    }
    const hash = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ error: 'User already exists' });
    }
    const user = {
      name,
      email,
      password: hash,
    };
    const newUser = await User.create(user);

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Error signing up user. Please try again later' });
  }
});
