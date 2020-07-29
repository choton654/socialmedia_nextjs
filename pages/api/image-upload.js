import User from '../../model/User';
import { authUser } from '../../utils/authUser';
import connectDb from '../../utils/connectDb';
import handler from '../../utils/handler';
const fileUpload = require('express-fileupload');
const path = require('path');
export const config = {
  api: {
    bodyParser: false,
  },
};
connectDb();
export default handler
  .use(authUser)
  .use(fileUpload())
  .put(async (req, res) => {
    if (!req.files) {
      return res.status(400).json({
        success: false,
        err: 'please upload a file',
      });
    }
    const file = req.files.file;

    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        err: 'please upload a image file',
      });
    }
    console.log(req.files);

    file.name = `photo_${req.user._id}${path.parse(file.name).ext}`;

    file.mv(`./static/uploads/${req.user.name}-${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          err: 'problem with file upload',
        });
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { avatar: file.name },
      );
      res
        .status(200)
        .json({ msg: 'image uploaded successfully', data: file.name });
    });
  });
