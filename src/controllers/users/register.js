const bcryptjs = require("bcryptjs");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { verifyMessage } = require("../../helpers");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isEmail = await User.findOne({ email });

  if (isEmail) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  // const msg = {
  //   to: email,
  //   from: "riabenko.igor@gmail.com",
  //   subject: "Please verify your email address",
  //   html: `<p>ProTest needs to confirm your email address is valid. Please click the link below to confirm you received this mail.</p><a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Verify Email</a>`,
  // };

  // await verifyMessage(msg);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    subscription: newUser.subscription,
    verificationToken: newUser.verificationToken,
  });
};

module.exports = register;
