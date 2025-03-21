const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  authorId: String,
  createdAt: { type: Date, default: Date.now },
});

const forumPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: String,
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
});

module.exports = mongoose.model("ForumPost", forumPostSchema);
