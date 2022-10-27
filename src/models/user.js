const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseSchemaError } = require("../helpers");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      maxLength: 15,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minLength: 6,
      maxLength: 30,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    techResults: {
      type: Number,
      default: 0,
    },
    techCounter: {
      type: Number,
      default: 0,
    },
    theoryResults: {
      type: Number,
      default: 0,
    },
    theoryCounter: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

// TODO
// tech 1test = 70%
// tech 2test = 40%
// tech 3test = 20%
// 

userSchema.post("save", handleMongooseSchemaError);

const registerSchema = Joi.object({
  username: Joi.string().required().max(10),
  email: Joi.string().required().min(6).max(30),
  password: Joi.string().required().min(8).max(100),
});

const loginSchema = Joi.object({
  email: Joi.string().required().min(6).max(30),
  password: Joi.string().required().min(8).max(100),
});

const reVerify = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  reVerify,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
