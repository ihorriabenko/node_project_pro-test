const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const getVerify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed")
  } 

  if (!user) {
    throw RequestError(404, "Not Found");
  }

  const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, { expiresIn: "2h" });

  await User.findByIdAndUpdate(user._id, {
    token,
    verify: true,
    verificationToken: "",
  });

  res.redirect(`${process.env.CLIENT_URL}/authSocial/${token}`);
};

module.exports = getVerify;
