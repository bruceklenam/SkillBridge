const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  opportunity: String,
  aboutBusiness: String,
  responsibilities: String,
  payout: Number,
  category: String,
  postedBy: String,
  status: {
    type: String,
    enum: ["open", "in-progress", "pending-payment", "completed"],
    default: "open",
  },
  createdAt: { type: Date, default: Date.now },
  freelancerId: String,
  paymentReference: String,
  paymentStatus: String,
  completedAt: Date,
  businessRating: Number,
  businessConfirmed: { type: Boolean, default: false },
  freelancerConfirmed: { type: Boolean, default: false },
  jobApplications: [
    {
      userId: String,
      email: String,
      name: String,
      mobileNumber: String,
      resumeUrl: String,
      coverLetterUrl: String,
      status: { type: String, enum: ["pending", "accept", "reject"], default: "pending" },
      appliedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Job", jobSchema);
