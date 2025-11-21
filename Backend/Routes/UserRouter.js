const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const multer = require("multer"); 
const path = require("path");
const fs = require("fs"); 

const protect = require("../Middlewares/AuthMiddleware"); 

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads/'));
  },
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get("/:userId", async (req, res) => {
});

router.put("/upload/:userId", protect, upload.single("profileImage"), async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId.toString()) {
        return res.status(403).json({ message: "Not authorized to update this profile" });
    }
    
    if (!req.file) {
        console.error("Multer Error: File was not processed.");
        return res.status(500).json({ message: "Failed to process image file." });
    }
    // 1. Fetch the user object to get the path of the old image
    const userToUpdate = await User.findById(req.params.userId);

    if (userToUpdate && userToUpdate.profileImage) {
        // 2. Construct the absolute path to the old image file
        const oldImagePath = path.join(__dirname, '..', userToUpdate.profileImage);
        
        // 3. Check if the file exists and delete it
        if (fs.existsSync(oldImagePath)) {
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Error deleting old image:", err);
                else console.log(`Successfully deleted old image: ${userToUpdate.profileImage}`);
            });
        }
    }
    
    // Update the user document with the new profileImage path
    const user = await User.findByIdAndUpdate(
      req.params.userId, 
      { profileImage: `/uploads/${req.file.filename}` }, 
      { new: true, select: '-password' }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json({ message: "Profile image updated", user });
  } catch (err) {
    console.error("Database Update Error:", err.message);
    res.status(500).json({ message: "Internal Server Error during DB update: " + err.message });
  }
});

module.exports = router;