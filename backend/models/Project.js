const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  payout: Number,
  category: String,
  postedBy: String,
  status: { type: String, enum: ["open", "completed"], default: "open" },
  createdAt: { type: Date, default: Date.now },
  completedBy: String,
  completedAt: Date,
  rating: Number,
});

module.exports = mongoose.model("Project", projectSchema);
