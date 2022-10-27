const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const authenticateSocial = require("./authenticate-social");

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  authenticateSocial,
};
