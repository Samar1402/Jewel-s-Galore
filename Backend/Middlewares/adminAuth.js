// middleware/adminAuth.js
// Runs after authMiddleware has successfully set req.user

const adminAuth = (req, res, next) => {
    // 🎯 FIX: Logic to check for admin role
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).json({ 
            message: "Access forbidden: Requires Admin role" 
        });
    }
};

module.exports = adminAuth;