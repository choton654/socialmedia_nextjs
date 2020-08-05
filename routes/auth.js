const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isEmail = require('validator/lib/isEmail');
const isLength = require('validator/lib/isLength');
const isEmpty = require('validator/lib/isEmpty');
const User = require('../model/User');

router

  // register a user
  .post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
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
      } else if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Password not match' });
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
      res.status(500).json({ error: error.code });
    }
  })

  // login user
  .post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      if (isEmpty(email)) {
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
        return res
          .status(404)
          .json({ error: 'user not exist with that email' });
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

module.exports = router;
