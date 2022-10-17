const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { verifyMessage } = require("../../helpers");
const { BASE_URL } = process.env;

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
    to: "riabenko.igor@gmail.com",
    from: "riabenko.igor@gmail.com",
    subject: "verify",
    text: "lorem2000",
    html: `<a href="${BASE_URL}/api/users/verify/${isUser.verificationToken}" target="_blank">Нажмите для подтверждения регистрации</a>`,
  };

  await verifyMessage(msg);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = reVerify;
