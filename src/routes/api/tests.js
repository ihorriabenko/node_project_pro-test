const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/tests");
const { schemas } = require("../../models/test");
const { validateBody, authenticate } = require("../../middlewares");

router.get("/qa/:type", authenticate, ctrlWrapper(ctrl.getQuestions));
router.get(
  "/results",
  validateBody(schemas.resultsSchema),
  authenticate,
  ctrlWrapper(ctrl.getResults)
);

module.exports = router;
