const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const getVerify = async (req, res) => {
  const { verificationToken } = req.params;
  const isVerifyUser = await User.findOne({ verificationToken });

  if (!isVerifyUser) {
    throw RequestError(404, "Not Found");
  }

  const token = jwt.sign({id: isVerifyUser._id}, process.env.SECRET_KEY, { expiresIn: "2h" });

  await User.findByIdAndUpdate(isVerifyUser._id, {
    token,
    verify: true,
    verificationToken: "",
  });

  res.redirect(`${process.env.CLIENT_URL}/authSocial/${token}`);
};

module.exports = getVerify;
