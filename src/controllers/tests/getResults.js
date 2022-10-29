const { Test } = require("../../models/test");
const { User } = require("../../models/user");

const getResults = async (req, res) => {
  const { value: userAnswers } = req.body;

  let type = null;

  const questions = await Test.find({});

  // const rightAnswersCounter = userAnswers.reduce((counter, answer) => {
  //   questions.find((question) => {
  //     if (question._id.toString() === answer._id && !type) {
  //       type = question.type;
  //     }
  //     if (
  //       question._id.toString() === answer._id &&
  //       question.rightAnswer === answer.answer
  //     ) {
  //       counter++;
  //     }
  //   });
  //   return counter;
  // }, 0);

  let rightAnswersCounter = 0;
  let counter = 0;

  for (const question of questions) {
    if (counter === 12) {
      break;
    }

    for (let i = 0; i < userAnswers.length; i++) {
      if (question._id.toString() === userAnswers[i]._id && !type) {
        type = question.type;
      }

      if (question._id.toString() === userAnswers[i]._id) {
        counter++;

        if (question.rightAnswer === userAnswers[i].answer) {
          rightAnswersCounter++;
        }

        userAnswers.splice(i, 1);
        break;
      }
    }
  }

  const checkYourPoints = () => {
    return (rightAnswersCounter / 12).toFixed(0) >= 0.5 ? 1 : -1;
  };

  if (type === "tech") {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        techResults: (
          (req.user.techResults * (req.user.techCounter - 1) +
            rightAnswersCounter / 12) /
          req.user.techCounter
        ).toFixed(2),
        techPoints:
          req.user.techPoints + checkYourPoints() >= 1
            ? req.user.techPoints + checkYourPoints()
            : 0,
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
        theoryPoints:
          req.user.theoryPoints + checkYourPoints() >= 1
            ? req.user.theoryPoints + checkYourPoints()
            : 0,
      }
    );
  }

  res.json({
    rightAnswers: rightAnswersCounter,
  });
};

module.exports = getResults;
