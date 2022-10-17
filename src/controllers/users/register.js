const bcryptjs = require("bcryptjs");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const {verifyMessage} = require("../../helpers")
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const isEmail = await User.findOne({ email });

  if (isEmail) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: email,
    from: "riabenko.igor@gmail.com",
    subject: "verify",
    text: "lorem2000",
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Нажмите для подтверждения регистрации</a>`,
  };

  await verifyMessage(msg);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    verificationToken: newUser.verificationToken,
  });
};

module.exports = register;
