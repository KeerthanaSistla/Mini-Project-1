// models/UserRelation.js
const mongoose = require("mongoose");

const userRelationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  relativeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  relation: String,
  nickname: String,
  description: String,
});

module.exports =
  mongoose.models.UserRelation ||
  mongoose.model("UserRelation", userRelationSchema);
