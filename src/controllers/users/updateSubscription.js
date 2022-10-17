// const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription });

  res.json(`message: Success updated to ${subscription}`);
};

module.exports = updateSubscription;
