const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const googleUser = async (req, res) => {
  const { _id } = req.user;

  const payload = {
    id: _id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(_id, { token });

  res.redirect(`${process.env.CLIENT_URL}/authSocial/${token}`);
};

module.exports = googleUser;
