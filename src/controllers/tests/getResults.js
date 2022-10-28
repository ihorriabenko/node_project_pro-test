const { Test } = require("../../models/test");
const { User } = require("../../models/user");

const getResults = async (req, res) => {
  const { value: userAnswers } = req.body;

  let type = null;

  const questions = await Test.find({});

  const rightAnswersCounter = userAnswers.reduce((counter, answer) => {
    questions.find((question) => {
      if (question._id.toString() === answer._id && !type) {
        type = question.type;
      }
      if (
        question._id.toString() === answer._id &&
        question.rightAnswer === answer.answer
      ) {
        counter++;
      }
    });
    return counter;
  }, 0);

  if (type === "tech") {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        techResults: (
          (req.user.techResults * (req.user.techCounter - 1) +
            rightAnswersCounter / 12) /
          req.user.techCounter
        ).toFixed(2),
      }
    );
  } else if (type === "theory") {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        theoryResults: (
          (req.user.theoryResults * (req.user.theoryCounter - 1) +
            rightAnswersCounter / 12) /
          req.user.theoryCounter
        ).toFixed(2),
      }
    );
  }

  res.json({
    rightAnswers: rightAnswersCounter,
  });
};

module.exports = getResults;
