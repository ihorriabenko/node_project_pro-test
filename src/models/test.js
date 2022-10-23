const { Schema, model } = require("mongoose");
const Joi = require("joi");

const testSchema = new Schema({
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  question: {
    type: String,
    required: [true, "Question is required"],
    unique: true,
  },
  answers: {
    type: Array,
    required: [true, "Answers is required"],
  },
  rightAnswer: {
    type: String,
  },
});

const Test = model("test", testSchema);

const resultsSchema = Joi.object({
  value: Joi.array().items(
    Joi.object({
      _id: Joi.string().required().min(24).max(24),
      answer: Joi.string().required(),
    })
  ),
});

const schemas = {
  resultsSchema,
};

module.exports = {
  Test,
  schemas,
};
