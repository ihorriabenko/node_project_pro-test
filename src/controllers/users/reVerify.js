const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { verifyMessage } = require("../../helpers");
const { CLIENT_URL } = process.env;

const reVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw RequestError(400, "missing required field email");
  }

  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw RequestError(404, "Not found");
  } else if (isUser.verify === true) {
    throw RequestError(400, "Verification has already been passed");
  }

  const msg = {
    to: email,
    from: "riabenko.igor@gmail.com",
    subject: "Please verify your email address",
    html: `<p>ProTest needs to confirm your email address is valid. Please click the link below to confirm you received this mail.</p><a href="${CLIENT_URL}/api/users/verify/${isUser.verificationToken}" target="_blank">Verify Email</a>`,
  };

  await verifyMessage(msg);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = reVerify;
