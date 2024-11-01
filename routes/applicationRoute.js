const express = require("express");
const Application = require("../models/application");
const { authMiddleware, adminOnly } = require("../middleware/auth");
const router = express.Router();

// Submit a new application (Student only)
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "student") return res.status(403).send("Only students can submit applications.");

  const { jobId, resume, coverLetter } = req.body;
  const application = new Application({ studentId: req.user.id, jobId, resume, coverLetter });

  try {
    await application.save();
    res.status(201).send("Application submitted successfully");
  } catch (error) {
    res.status(400).send("Error submitting application");
  }
});

// View all applications (Admin only)
router.get("/", authMiddleware, adminOnly, async (req, res) => {
  const applications = await Application.find().populate("studentId jobId");
  res.send(applications);
});

// Update application status (Admin only)
router.put("/:id", authMiddleware, adminOnly, async (req, res) => {
  const { status } = req.body;
  try {
    await Application.findByIdAndUpdate(req.params.id, { status });
    res.send("Application status updated");
  } catch (error) {
    res.status(400).send("Error updating application status");
  }
});

module.exports = router;
