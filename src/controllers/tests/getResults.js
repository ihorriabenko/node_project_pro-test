const { Test } = require("../../models/test");

const getResults = async (req, res) => {
  const { value: userAnswers } = req.body;

  let rightAnswersCounter = 0;
  for (let el of userAnswers) {
    const dbQuestion = await Test.findOne({ _id: el._id });

    if (dbQuestion && dbQuestion.rightAnswer === el.answer) {
      rightAnswersCounter += 1;
    }
  }

  res.json({
    rightAnswers: rightAnswersCounter,
  });
};

module.exports = getResults;
