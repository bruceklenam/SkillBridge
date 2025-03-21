const express = require("express");
const authMiddleware = require("../middleware/auth");
const Project = require("../models/Project");

const router = express.Router();


/* current logic isnt the best, there was no discussion in the group 
on how to go about it so this is how I envisioned it*/

// create Project
router.post("/createProject", authMiddleware(["business", "mentor"]), async (req, res) => {
  const { title, description, payout, category } = req.body;
  if (!title || !description || !payout || !category) {
    return res.status(400).json({ error: "Title, description, payout, and category are required" });
  }

  try {
    const project = new Project({
      title,
      description,
      payout,
      category,
      postedBy: req.user.id,
      status: "open",
    });
    await project.save();
    res.status(201).json({ id: project._id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get projects
router.get("/projects", async (req, res) => {
  const { category } = req.query;
  try {
    let query = { status: "open" };
    if (category) query.category = category;
    const projects = await Project.find(query);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete Project
router.post("/completeProject", authMiddleware(["student"]), async (req, res) => { // should it be student or business and mentors?
  const { projectId } = req.body;
  if (!projectId) {
    return res.status(400).json({ error: "projectId is required" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    project.status = "completed";
    project.completedBy = req.user.id;
    project.completedAt = new Date();
    await project.save();
    res.status(200).json({ message: "Project completed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// review Project  (as in giving feeback after project completion)
router.post("/reviewProject", authMiddleware(["business", "mentor"]), async (req, res) => {
  const { projectId, rating } = req.body;
  if (!projectId || rating === undefined) {
    return res.status(400).json({ error: "projectId and rating are required" });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project || project.postedBy !== req.user.id) {
      return res.status(403).json({ error: "You can only review your own projects" });
    }
    project.rating = rating;
    project.reviewedAt = new Date();
    await project.save();
    res.status(200).json({ message: "Project reviewed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
