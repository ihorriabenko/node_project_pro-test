const { Test } = require("../../models/test");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const getQuestions = async (req, res) => {
  const { type } = req.params;

  if (type !== 'tech' && type !== 'theory') {
    throw RequestError(400, "Bad request")
  }

  const questions = await Test.find({ type }, "-rightAnswer");

  const shuffledQuestions = [...questions]
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

  if (type === "tech") {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { techCounter: req.user.techCounter + 1 }
    );
  } else if (type === "theory") {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { theoryCounter: req.user.theoryCounter + 1 }
    );
  }

  res.json(shuffledQuestions);
};

module.exports = getQuestions;
