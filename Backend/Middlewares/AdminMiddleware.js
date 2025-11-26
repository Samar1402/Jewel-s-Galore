// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No authentication token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    
    // 🎯 FIX: Ensure role is attached to req.user
    req.user = {
        _id: decoded._id, 
        email: decoded.email,
        role: decoded.role 
    };
    next(); 
  });
};