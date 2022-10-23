const { Test } = require("../../models/test");

const getResults = async (req, res) => {
  const { value } = req.body;

  const rightAnswersCounter = await value.reduce(async (acc, el) => {
    const dbQuestion = await Test.findOne({ _id: el._id });

    if (dbQuestion && dbQuestion.rightAnswer === el.answer) {
      acc += 1;
    }

    return acc;
  }, 0);

  // const questions = await Test.find();
  // let acc = 0;
  // for (const question of questions) {
  //   userAnswers.forEach((userAnswer) => {
  //     console.log(`${question._id}` === `new ObjectId("${userAnswer._id}")`);
  //     if (question._id === `new ObjectId("${userAnswer._id}")`) {
  //       if (question.rightAnswer === userAnswer.answer) {
  //         acc += 1;
  //       }
  //     }
  //   });
    // if (acc === 12) {
    //   break;
    // }
  // }

  res.json({
    rightAnswers: rightAnswersCounter,
  });
};

module.exports = getResults;

// {
//   _id: new ObjectId("634e71e6b739faa5926ec29b"),
//   type: 'theory',
//   question: 'navigate().back(). This navigation command in Selenium:',
//   answers: [
//     'Returns the user to the previous page from the browser history',
//     'Allows the user to navigate to the next page according to the browser history',
//     'Used to refresh the browser page',
//     'Allows the user to open a new window in the browser and follow the specified URL',
//     'There is no such command'
//   ],
//   rightAnswer: 'Returns the user to the previous page from the browser history'
// }
