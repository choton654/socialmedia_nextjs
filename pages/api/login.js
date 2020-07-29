import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isemail';
import isEmpty from 'validator/lib/isEmpty';
import User from '../../model/User';
import connectDb from '../../utils/connectDb';
import handler from '../../utils/handler';
connectDb();
export default handler.post(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (isEmpty(email, { ignore_whitespace: true })) {
      return res.status(404).json({ error: 'Email must not be empty' });
    } else if (!isEmail(email)) {
      return res.status(422).json({ error: 'Email must be valid' });
    } else if (isEmpty(password)) {
      return res.status(404).json({ error: 'Password must not be empty' });
    }

    // check to see if user already exists in db
    const user = await User.findOne({ email }).select('+password');

    // if not return error
    if (!user) {
      return res.status(404).json({ error: 'user not exist with that email' });
    }

    // check to see if users' password matches the one in db
    const passwordMatch = await bcrypt.compare(password, user.password);

    // if so jenerate a token
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      // send token to client
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Wrong Credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});
