const { User } = require("../../models/user");

const getTopResults = async (req, res) => {
  const users = await User.find({});

  const topTech = [...users]
    .sort((a, b) => b.techPoints - a.techPoints)
    .slice(0, 10)
    .sort((a, b) => b.techResults - a.techResults)
    .map((el) => {
      return {
        email: el.email,
        techCounter: el.techCounter,
        techResults: el.techResults,
        theoryCounter: el.theoryCounter,
        theoryResults: el.theoryResults,
      };
    });

  const topTheory = [...users]
    .sort((a, b) => b.theoryPoints - a.theoryPoints)
    .slice(0, 10)
    .sort((a, b) => b.theoryResults - a.theoryResults)
    .map((el) => {
      return {
        email: el.email,
        techCounter: el.techCounter,
        techResults: el.techResults,
        theoryCounter: el.theoryCounter,
        theoryResults: el.theoryResults,
      };
    });

  res.json({
    topTech,
    topTheory,
  });
};

module.exports = getTopResults;
