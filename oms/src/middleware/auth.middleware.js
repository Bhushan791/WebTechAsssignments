const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.config");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: "Invalid or expired token" });
  }
};

// Optional: restrict to admin only
const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, msg: "Admin access only" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };