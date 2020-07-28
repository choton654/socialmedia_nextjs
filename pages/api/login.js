import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nc from 'next-connect';
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
  const { email, password } = req.body;

  try {
    // check to see if user already exists in db
    const user = await User.findOne({ email }).select('+password');

    // if not return error
    if (!user) {
      return res.status(404).send('user not exist with that email');
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
      res.status(401).send('Passwords do not match');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in user');
  }
});
