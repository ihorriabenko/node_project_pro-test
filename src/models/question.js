const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
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

const Question = model("question", questionSchema);

module.exports = {
  Question,
};
