const { Test } = require("../../models/test");

const getQuestions = async (req, res) => {
  const { type } = req.params;

  const questions = await Test.find({ type });

  const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());

  res.json({
    questions: shuffledQuestions.slice(0, 12),
  });
};

module.exports = getQuestions;
