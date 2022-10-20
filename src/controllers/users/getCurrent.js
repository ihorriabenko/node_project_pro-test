const getCurrent = async (req, res) => {
  const { _id, username, email } = req.user;
  res.json({
    _id,
    username,
    email,
  });
};

module.exports = getCurrent;
