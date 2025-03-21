const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const { OpenAI } = require("openai");

const router = express.Router();


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },// maximum fileupload size. note it on the frontend
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/; //only these file types accepted
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images, PDFs, and Word documents are allowed!"));
  },
});

// Upload Resume
router.post(
  "/uploadResume",
  authMiddleware(["mentor", "student"]),
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      const resumeUrl = `/uploads/${req.file.filename}`;
      user.resumeUrl = resumeUrl;
      await user.save();

      res.status(200).json({ message: "Resume uploaded successfully", url: resumeUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Upload Cover Letter
router.post(
  "/uploadCoverLetter",
  authMiddleware(["mentor", "student"]),
  upload.single("coverLetter"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      const coverLetterUrl = `/uploads/${req.file.filename}`;
      user.coverLetterUrl = coverLetterUrl;
      await user.save();

      res.status(200).json({ message: "Cover letter uploaded successfully", url: coverLetterUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get Profile
router.get("/profile", authMiddleware(["business", "mentor", "student", "admin"]), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Profile
router.put("/updateProfile", authMiddleware(["business", "mentor", "student"]), async (req, res) => {
  const { fullName, about, skills, education, portfolio, services, location } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.fullName = fullName || user.fullName;
    user.about = about || user.about;
    user.skills = skills || user.skills;
    user.education = education || user.education;
    user.portfolio = portfolio || user.portfolio;
    user.services = services || user.services;
    if (user.role === "business" && location) {
      user.businessProfile = { ...user.businessProfile, location };
    }
    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate Resume .... used openai model "gpt-4o-mini" just in case u need it
router.get("/generateResume", authMiddleware(["mentor", "student"]), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = {
      fullName: user.fullName || "Not provided",
      about: user.about || "Not provided",
      skills: user.skills.length ? user.skills.join(", ") : "Not provided",
      education: user.education.length
        ? user.education.map((edu) => `${edu.degree} - ${edu.institution} (${edu.year})`).join("\n")
        : "Not provided",
      portfolio: user.portfolio.length ? user.portfolio.join("\n") : "Not provided",
      services: user.services?.length ? user.services.join(", ") : "Not provided",
    };

    
    
    //current prompt to openai for resume generation, u can edit it 
    const prompt = `
      Generate a professional resume in HTML format for the following user:
      - Name: ${userData.fullName}
      - About: ${userData.about}
      - Skills: ${userData.skills}
      - Education: ${userData.education}
      - Portfolio: ${userData.portfolio}
      - Services: ${userData.services}

      Include sections with proper HTML styling (e.g., headings, paragraphs, lists) for a clean, professional look. Use inline CSS for simplicity.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional resume writer." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiGeneratedResume = completion.choices[0].message.content;

    res.status(200).json({ resume: aiGeneratedResume });
  } catch (error) {
    res.status(500).json({ error: `Failed to generate resume: ${error.message}` });
  }
});

// Review User
router.post("/reviewUser", authMiddleware(["business", "mentor", "student"]), async (req, res) => {
  const { userId, rating, comment } = req.body;
  if (!userId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "User ID and rating (1-5) are required" });
  }

  try {
    const userToReview = await User.findById(userId);
    if (!userToReview) {
      return res.status(404).json({ error: "User to review not found" });
    }

    userToReview.reviews.push({
      reviewerId: req.user.id,
      rating,
      comment: comment || "",
    });

    const totalReviews = userToReview.reviews.length;
    const averageRating = userToReview.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    userToReview.rating = averageRating;

    await userToReview.save();
    res.status(200).json({ message: "Review submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
