import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nc from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import User from '../../model/User';
import connectDb from '../../utils/connectDb';
connectDb();
export default nc({
  onError(error, req, res) {
    res.status(501).send(`something went wrong ${error}`);
  },
  onNoMatch(req, res) {
    req.status(405).send(`method ${req.method} not allowed`);
  },
}).post(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!isEmail(email)) {
      return res.status(404).send('Valid Email is required');
    } else if (!isLength(name, { min: 4, max: 20 })) {
      return res.status(404).send('Name must be 4 to 20 letters long');
    } else if (!isLength(password, { min: 6, max: 12 })) {
      return res.status(404).send('Password must be 6 to 12 letters long');
    }
    const hash = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).send('User already exists');
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
    res.status(500).send('Error signing up user. Please try again later');
  }
});
