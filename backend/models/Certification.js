const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  issuedBy: String,
  issuedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Certification", certificationSchema);
