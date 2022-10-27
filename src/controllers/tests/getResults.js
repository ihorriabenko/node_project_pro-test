const { Test } = require("../../models/test");
const { User } = require("../../models/user");

const getResults = async (req, res) => {
  const { value: userAnswers } = req.body;

  let type = null;

  let rightAnswersCounter = 0;
  for (let el of userAnswers) {
    const dbQuestion = await Test.findOne({ _id: el._id });

    if (!type) {
      type = dbQuestion.type;
    }
    if (dbQuestion && dbQuestion.rightAnswer === el.answer) {
      rightAnswersCounter += 1;
    }
  }

  console.log(type);

  if (type === "tech") {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        techResults:
          ((req.user.techResults * (req.user.techCounter - 1) + rightAnswersCounter / 12) / req.user.techCounter).toFixed(2),
      }
    );
  } else if (type === "theory") {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        theoryResults:
          ((req.user.theoryResults * (req.user.theoryCounter - 1) + rightAnswersCounter / 12) / req.user.theoryCounter).toFixed(2),
      }
    );
  }

  res.json({
    rightAnswers: rightAnswersCounter,
  });
};

module.exports = getResults;
