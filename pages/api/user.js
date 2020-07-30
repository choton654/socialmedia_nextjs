import isEmpty from 'validator/lib/isEmpty';
import User from '../../model/User';
import { authUser } from '../../utils/authUser';
import connectDb from '../../utils/connectDb';
import handler from '../../utils/handler';
connectDb();
export default handler
  .use(authUser)
  .put(async (req, res) => {
    let userDetails = {};
    const { bio, website, location } = req.body;
    try {
      if (!isEmpty(bio.trim())) userDetails.bio = bio;
      if (!isEmpty(website.trim())) {
        // https://website.com
        if (website.trim().substring(0, 4) !== 'http') {
          userDetails.website = `http://${website.trim()}`;
        } else userDetails.website = website;
      }
      if (!isEmpty(location.trim())) userDetails.location = location;

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        userDetails,
        {
          new: true,
          runValidators: true,
        },
      );
      res
        .status(200)
        .json({ msg: 'Details added successfully', data: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.code });
    }
  })
  .get(async (req, res) => {
    const {
      query: { id },
    } = req;

    try {
      const user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(404).json({ msg: 'no user found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.code });
    }
  });
