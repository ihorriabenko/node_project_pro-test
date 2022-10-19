const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseSchemaError } = require("../helpers");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      maxLength: 10,
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
    avatarURL: {
      type: String,
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
  },
  { timestamps: true }
);

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
