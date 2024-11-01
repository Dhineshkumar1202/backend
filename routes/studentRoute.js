const express = require("express");
const Application = require("../models/application");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

// View student's own applications
router.get("/applications", authMiddleware, async (req, res) => {
  if (req.user.role !== "student") return res.status(403).send("Access restricted to students.");

  const applications = await Application.find({ studentId: req.user.id });
  res.send(applications);
});

module.exports = router;
