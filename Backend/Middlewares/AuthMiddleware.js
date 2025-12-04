const jwt = require("jsonwebtoken");
const User = require('../Models/user'); 

module.exports = async (req, res, next) => { 
    
    if (!process.env.JWT_SECRET) {
        console.error("❌ ERROR: JWT_SECRET is missing in .env");
        return res.status(500).json({ success: false, message: "Server misconfiguration" });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized: Token missing or invalid format" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;
        const user = await User.findById(userId).select('-password -securityKey');
        
        if (!user) {
             return res.status(401).json({ success: false, message: "Invalid token or user no longer exists." });
        }
        req.user = user;

        next();
    } catch (err) {
        console.error(`❌ JWT Verification Failed:`, err.message);
        
        let message = "Invalid or expired token";
        if (err.name === 'TokenExpiredError') {
             message = "Token expired. Please log in again.";
        }

        return res.status(401).json({ success: false, message: message });
    }
};