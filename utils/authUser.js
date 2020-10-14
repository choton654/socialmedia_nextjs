const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Router = require("next/router");
const { JWT_SECRET } = require("../src/keys");
exports.authUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).json({ error: "Unauthorized" });
  }
  try {
    const { userId } = jwt.verify(req.headers.authorization, JWT_SECRET);

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    req.user = user;
    // console.log(req.user);
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "token verification field" });
  }
};
