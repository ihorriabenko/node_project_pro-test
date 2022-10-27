const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/tests");
const { schemas } = require("../../models/test");
const { validateBody, authenticate } = require("../../middlewares");

router.get("/qa/:type", ctrlWrapper(ctrl.getQuestions));
router.post(
  "/results",
  validateBody(schemas.resultsSchema),
  authenticate,
  ctrlWrapper(ctrl.getResults)
);

module.exports = router;
