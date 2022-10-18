const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/questions");
const { schemas } = require("../../models/question");
const { authenticate } = require("../../middlewares");

router.get("/:type", authenticate, ctrlWrapper(ctrl.getQuestions));

module.exports = router;
