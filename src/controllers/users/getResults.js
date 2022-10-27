const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const getResults = async (req, res) => {
  const { _id } = req.params;

  const user = await User.findById({ _id });

  if (!user) {
    throw RequestError(404, "Not found");
  }

  res.json({
    user: {
      username: user.username,
      email: user.email,
      techResults: user.techResults,
      techCounter: user.techCounter,
      theoryResults: user.theoryResults,
      theoryCounter: user.theoryCounter,
    },
  });
};

module.exports = getResults;
