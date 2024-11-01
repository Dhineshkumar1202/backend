const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth"); // Assuming you need authMiddleware

// Define a protected route
router.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Welcome to the protected admin dashboard.");
});

module.exports = router;
