// controllers/adminController.js
const UserModel = require("../Models/user");

// Function to retrieve the admin profile by ID
const getAdminProfile = async (req, res) => {
    try {
        // ID is extracted from the URL parameter (e.g., /admin/12345)
        const adminId = req.params.id; 

        // Find the user by ID and ensure their role is explicitly 'admin'
        const admin = await UserModel.findOne({ 
            _id: adminId, 
            role: 'admin' 
        }).select('-password'); // Exclude the sensitive password field

        if (!admin) {
            return res.status(404).json({ message: "Admin profile not found or user is not an Admin.", success: false });
        }

        // Success: Return the admin data
        res.status(200).json(admin);

    } catch (error) {
        console.error("Error fetching admin profile:", error);
        // Handle MongoDB/Mongoose errors, like invalid ID format
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// You will add more functions here (e.g., updateAdminDetails, uploadAdminImage)
module.exports = {
    getAdminProfile
};