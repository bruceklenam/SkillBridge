const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["business", "mentor", "student", "admin"] }, // Added admin role
  about: String,
  skills: [String],
  education: [{ degree: String, institution: String, year: String }],
  portfolio: [String],
  services: [String],
  rating: { type: Number, default: 0 },
  reviews: [{ reviewerId: String, rating: Number, comment: String, createdAt: { type: Date, default: Date.now } }], // Added reviews
  balance: { type: Number, default: 0 },
  businessProfile: { about: String, location: String },
  resumeUrl: String,
  coverLetterUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
