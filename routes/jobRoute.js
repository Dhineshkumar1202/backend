const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Job = require('../models/job');

// Route to create a new job posting (admin only)
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all jobs (accessible to both students and admins)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
