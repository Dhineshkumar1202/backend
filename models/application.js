const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  status: { type: String, enum: ["submitted", "reviewed", "shortlisted", "accepted", "rejected"], default: "submitted" }
});

module.exports = mongoose.model("Application", ApplicationSchema);
