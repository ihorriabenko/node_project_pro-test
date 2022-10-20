const { Test } = require("../../models/test");

const getResults = async (req, res) => {
  const rightAnswersCounter = await req.body.reduce(async (acc, el) => {
    const dbQuestion = await Test.findOne({ _id: el._id });

    if (dbQuestion && dbQuestion.rightAnswer === el.answer) {
      acc += 1;
    }

    return acc;
  }, 0);

  res.json({
    rightAnswers: rightAnswersCounter,
  });
};

module.exports = getResults;
