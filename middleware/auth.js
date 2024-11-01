const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Access denied.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token.");
  }
};

module.exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).send("Admin access only.");
  next();
};
