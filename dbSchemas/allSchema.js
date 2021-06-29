const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Answer: { type: String, required: true },
  QuestionID: { type: String, required: true },
});

const newRequestSchema = new mongoose.Schema({
  Firstname: { type: String, required: true },
  Lastname: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Gender: { type: String, required: true },
  Password: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Question: { type: String, required: true },
  Views: { type: Array, unique: true },
});

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
});

const notificationSchema = new mongoose.Schema({
  generateID: { type: String, required: true },
  notifyID: { type: String, required: true },
  notifyType: { type: String, required: true },
  marked: { type: Boolean, required: true },
  QuestionContent: { type: String, required: "true" },
});

module.exports = {
  answerSchema,
  newRequestSchema,
  postSchema,
  userSchema,
  notificationSchema,
};
