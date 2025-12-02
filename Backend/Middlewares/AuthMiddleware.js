const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
        req.user = {
            id: decoded.id || decoded._id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (err) {
        console.error(`❌ JWT Verification Failed:`, err.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};