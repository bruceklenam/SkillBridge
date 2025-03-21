const express = require("express");
const authMiddleware = require("../middleware/auth");
const Certification = require("../models/Certification");

const router = express.Router();

// Issue Certification
router.post("/issueCertification", authMiddleware(["business", "mentor"]), async (req, res) => {
  const { userId, title, description } = req.body;
  if (!userId || !title || !description) {
    return res.status(400).json({ error: "userId, title, and description are required" });
  }

  try {
    const certification = new Certification({
      userId,
      title,
      description,
      issuedBy: req.user.id,
    });
    await certification.save();
    res.status(201).json({ id: certification._id, message: "Certification issued successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Certifications
router.get("/getCertifications", authMiddleware(["business", "mentor", "student"]), async (req, res) => {
  const { userId } = req.query;
  try {
    let query = {};
    if (userId) {
      query.userId = userId;
    } else if (req.user.role !== "admin") {
      query.userId = req.user.id; //  user's own certifications unless admin
    }
    const certifications = await Certification.find(query);
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;