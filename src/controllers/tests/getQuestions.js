const { Test } = require("../../models/test");

const getQuestions = async (req, res) => {
  const { type } = req.params;

  const questions = await Test.find({ type });

  const shuffledQuestions = [...questions]
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

  res.json(
    shuffledQuestions.map((el) => {
      return {
        _id: el._id,
        question: el.question,
        answers: el.answers,
      };
    })
  );
};

module.exports = getQuestions;
