const express = require("express");
const authMiddleware = require("../middleware/auth");
const Job = require("../models/Job");
const User = require("../models/User");
const Dispute = require("../models/Dispute");
const Paystack = require("paystack")(process.env.PAYSTACK_SECRET);
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// create job
router.post("/createJob", authMiddleware(["business"]), async (req, res) => {
  const { title, location, opportunity, responsibilities, payout, category } = req.body;
  if (!title || !location || !responsibilities || !payout || !category) {
    return res.status(400).json({ error: "Title, location, responsibilities, payout, and category are required" });
  }

  try {
    const user = await User.findById(req.user.id);
    const job = new Job({
      title,
      company: user.fullName,
      location,
      opportunity: opportunity || "",
      aboutBusiness: user.businessProfile?.about || "Not provided",
      responsibilities,
      payout,
      category,
      postedBy: req.user.id,
      status: "open",
    });
    await job.save();
    res.status(201).json({ id: job._id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Jobs (with pagination)
router.get("/jobs", async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  try {
    let query = { status: "open" };
    if (category) query.category = category;

    const jobs = await Job.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Job.countDocuments(query);
    res.status(200).json({
      jobs,
      page,
      pages: Math.ceil(count / limit),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Apply for Job
router.post("/applyForJob", authMiddleware(["student", "mentor"]), async (req, res) => {
  const { jobId, mobileNumber } = req.body;
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    const user = await User.findById(req.user.id);
    const existingApplication = job.jobApplications.find((app) => app.userId === req.user.id);
    if (existingApplication) {
      return res.status(400).json({ error: "Already applied" });
    }

    job.jobApplications.push({
      userId: req.user.id,
      email: user.email,
      name: user.fullName,
      mobileNumber: mobileNumber || "",
      resumeUrl: user.resumeUrl || "",
      coverLetterUrl: user.coverLetterUrl || "",
    });
    await job.save();

    // Notify business via email
    const business = await User.findById(job.postedBy);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: business.email,
      subject: "New Job Application",
      text: `A new application has been submitted for your job "${job.title}" by ${user.fullName}.`,
    });

    res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Applicants
router.get("/applicants/:jobId", authMiddleware(["business"]), async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job || job.postedBy !== req.user.id) {
      return res.status(403).json({ error: "You can only view applicants for your own jobs" });
    }
    res.status(200).json(job.jobApplications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manage Application
router.post("/manageApplication", authMiddleware(["business"]), async (req, res) => {
  const { jobId, applicantId, decision } = req.body;
  if (!jobId || !applicantId || !["accept", "reject"].includes(decision)) {
    return res.status(400).json({ error: "Job ID, applicant ID, and decision (accept/reject) are required" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job || job.postedBy !== req.user.id) {
      return res.status(403).json({ error: "You can only manage applications for your own jobs" });
    }
    const application = job.jobApplications.find((app) => app.userId === applicantId);
    if (!application) {
      return res.status(404).json({ error: "Applicant not found" });
    }

    application.status = decision;
    if (decision === "accept") {
      job.freelancerId = applicantId;
      job.status = "in-progress";
    }
    await job.save();

    // Notify applicant via email
    const applicant = await User.findById(applicantId);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: applicant.email,
      subject: `Application Status Update for ${job.title}`,
      text: `Your application for the job "${job.title}" has been ${decision}ed.`,
    });

    // Real-time update
    req.io.to(`job_${jobId}`).emit("applicationUpdated", { jobId, applicantId, decision });

    res.status(200).json({ message: `Application ${decision}ed successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete Job with Payment
router.post("/completeJobWithPayment", authMiddleware(["business"]), async (req, res) => {
  const { jobId, clientId, businessRating } = req.body;
  if (!jobId || !clientId) {
    return res.status(400).json({ error: "Job ID and client ID are required" });
  }
  if (businessRating && (businessRating < 1 || businessRating > 5)) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    if (job.status !== "in-progress" || !job.freelancerId) {
      return res.status(400).json({ error: "Job is not in progress or not assigned" });
    }

    const client = await User.findById(clientId);
    const amount = Math.round(job.payout * 100); // paystack uses pesewas as base so I converted
    const paymentData = {
      email: client.email,
      amount,
      currency: "GHS",
      metadata: { jobId, freelancerId: job.freelancerId, status: "pending" },
    };
    const charge = await Paystack.transaction.initialize(paymentData);
    job.status = "pending-payment";
    job.paymentReference = charge.data.reference;
    job.paymentStatus = "pending";
    job.completedAt = new Date();
    job.businessRating = businessRating || null;
    await job.save();

    // Real-time update
    req.io.to(`job_${jobId}`).emit("jobStatusUpdated", { jobId, status: job.status });

    res.status(200).json({
      message: "Payment initiated, awaiting verification",
      reference: charge.data.reference,
    });
  } catch (error) {
    res.status(500).json({ error: `Payment failed: ${error.message}` });
  }
});

// Get Recommended Jobs
router.get("/recommendedJobs", authMiddleware(["student"]), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userSkills = user.skills || [];
    const userLocation = user.location || "";
    const jobs = await Job.find({ status: "open" });

    const recommendedJobs = jobs
      .map((job) => {
        let matchScore = 0;
        if (userSkills.some((skill) => job.category.includes(skill))) {
          matchScore += 1;
        }
        if (job.location === userLocation || job.location === "Remote") {
          matchScore += 0.5;
        }
        return { ...job._doc, matchScore };
      })
      .filter((job) => job.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    res.status(200).json(recommendedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get My Applications
router.get("/myApplications", authMiddleware(["student", "mentor"]), async (req, res) => {
  try {
    const jobs = await Job.find({ "jobApplications.userId": req.user.id });
    const applications = jobs.flatMap((job) =>
      job.jobApplications
        .filter((app) => app.userId === req.user.id)
        .map((app) => ({ ...app._doc, jobId: job._id }))
    );
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Completion
router.post("/verifyCompletion", authMiddleware(["business", "student", "mentor"]), async (req, res) => {
  const { jobId, isBusiness } = req.body;
  if (!jobId || isBusiness === undefined) {
    return res.status(400).json({ error: "Job ID and isBusiness flag are required" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    if (job.status !== "pending-payment") {
      return res.status(400).json({ error: "Job is not awaiting payment verification" });
    }

    let freelancer;
    if (isBusiness) {
      job.businessConfirmed = true;
    } else {
      job.freelancerConfirmed = true;
      freelancer = await User.findById(job.freelancerId);
    }

    if (job.businessConfirmed && job.freelancerConfirmed) {
      freelancer = await User.findById(job.freelancerId); 
      freelancer.balance = (freelancer.balance || 0) + job.payout;
      await freelancer.save();

      job.status = "completed";
      job.paymentStatus = "completed";

      if (job.businessRating) {
        const business = await User.findById(job.postedBy);
        const currentRating = business.rating || 0;
        const completedJobs = business.completedJobs || 1;
        business.rating = (currentRating * (completedJobs - 1) + job.businessRating) / completedJobs;
        business.completedJobs = (business.completedJobs || 0) + 1;
        await business.save();
      }
      await job.save();

      // Notify both parties
      const business = await User.findById(job.postedBy);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: business.email,
        subject: `Job Completion: ${job.title}`,
        text: `The job "${job.title}" has been completed and payment released.`,
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: freelancer.email,
        subject: `Job Completion: ${job.title}`,
        text: `The job "${job.title}" has been completed. You have been paid ${job.payout} GHS.`,
      }); // tried to handle dynamic currency but it didn't work, got many erros had to hardcode

      // Real-time update
      req.io.to(`job_${jobId}`).emit("jobStatusUpdated", { jobId, status: job.status });
      res.status(200).json({ message: "Payment released and job completed" });
    } else {
      await job.save();
      req.io.to(`job_${jobId}`).emit("jobStatusUpdated", { jobId, status: "pending-payment" });
      res.status(200).json({
        message: "Verification recorded, awaiting other party confirmation",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// File Dispute (this is where I said we'd need to set up an admin panel for resolution)
router.post("/fileDispute", authMiddleware(["business", "student", "mentor"]), async (req, res) => {
  const { jobId, reason, isBusiness } = req.body;
  if (!jobId || !reason || isBusiness === undefined) {
    return res.status(400).json({ error: "Job ID, reason, and isBusiness flag are required" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const dispute = new Dispute({
      jobId,
      userId: req.user.id,
      reason,
      isBusiness,
    });
    await dispute.save();

    // Real-time update
    req.io.to(`job_${jobId}`).emit("disputeFiled", { jobId, disputeId: dispute._id });

    res.status(200).json({ message: "Dispute filed successfully", disputeId: dispute._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;