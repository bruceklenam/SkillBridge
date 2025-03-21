const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Job = require("../models/Job");
const Dispute = require("../models/Dispute");

const router = express.Router();

// get all ysers
router.get("/users", authMiddleware(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete User
router.delete("/users/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all jobs
router.get("/jobs", authMiddleware(["admin"]), async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete Job
router.delete("/jobs/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get disputes
router.get("/disputes", authMiddleware(["admin"]), async (req, res) => {
  try {
    const disputes = await Dispute.find();
    res.status(200).json(disputes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// resolve dispute
router.put("/disputes/:id/resolve", authMiddleware(["admin"]), async (req, res) => {
  const { resolution } = req.body;
  if (!resolution) {
    return res.status(400).json({ error: "Resolution is required" });
  }

  try {
    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) {
      return res.status(404).json({ error: "Dispute not found" });
    }

    dispute.status = "resolved";
    dispute.resolution = resolution;
    dispute.resolvedAt = new Date();
    await dispute.save();

    res.status(200).json({ message: "Dispute resolved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
