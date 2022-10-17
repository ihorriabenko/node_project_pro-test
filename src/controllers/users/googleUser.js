const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const googleUser = async (req, res) => {
  const { _id } = req.user;

  const payload = {
    id: _id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const user = await User.findByIdAndUpdate(_id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = googleUser;
