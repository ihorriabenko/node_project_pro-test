const { Question } = require("../../models/question");

const getQuestionsController = async (req, res) => {
  const { type } = req.params;

  const questions = await Question.find({ type });

  const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());

  res.json({
    questions: shuffledQuestions.slice(0, 12),
  });
};

module.exports = getQuestionsController;
