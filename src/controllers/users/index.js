const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const googleUser = require("./googleUser");
const facebookUser = require("./facebookUser");
const getVerify = require("./getVerify");
const reVerify = require("./reVerify");
// const resetData = require("./resetData");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  googleUser,
  facebookUser,
  getVerify,
  reVerify,
  // resetData,
};
