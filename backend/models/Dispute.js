const mongoose = require("mongoose");

const disputeSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  userId: { type: String, required: true },
  reason: { type: String, required: true },
  isBusiness: { type: Boolean, required: true },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date,
  resolution: String, // optional field for resolution details
});

module.exports = mongoose.model("Dispute", disputeSchema);
