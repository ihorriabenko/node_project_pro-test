const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const getVerify = async (req, res) => {
  const { verificationToken } = req.params;
  const isVerifyUser = await User.findOne({ verificationToken });

  if (!isVerifyUser) {
    throw RequestError(404, "Not Found");
  }

  await User.findByIdAndUpdate(isVerifyUser._id, {verify: true, verificationToken: ""});

  res.json({
    message: "Verification successful",
  });
};

module.exports = getVerify;
